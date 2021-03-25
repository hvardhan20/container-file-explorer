import docker
import tarfile
import io
import asyncio


def generator_to_stream(generator, buffer_size=io.DEFAULT_BUFFER_SIZE):
    class GeneratorStream(io.RawIOBase):
        def __init__(self):
            self.leftover = None

        def readable(self):
            return True

        def readinto(self, b):
            try:
                l = len(b)  # : We're supposed to return at most this much
                chunk = self.leftover or next(generator)
                output, self.leftover = chunk[:l], chunk[l:]
                b[:len(output)] = output
                return len(output)
            except StopIteration:
                return 0  # : Indicate EOF
    return io.BufferedReader(GeneratorStream())


class DockerUtils:

    def __init__(self, **kwargs):
        self.client = None
        self.create_conn(**kwargs)

    def create_conn(self, **kwargs):
        if self.client is None:
            self.client = docker.from_env()

    @property
    def client(self):
        return self._client

    @client.setter
    def client(self, value):
        self._client = value

    def get_containers(self, container_id=None, **kwargs):
        res = []
        if container_id:
            containers = [self.client.containers.get(container_id=container_id, **kwargs)]
        else:
            containers = self.client.containers.list(**kwargs)
        for container in containers:
            res.append({
                'attrs': container.attrs,
                'id': container.short_id,
                'labels': container.labels,
                'image': container.image.short_id,
                'status': container.status
            })
        return res

    def get_archive(self, container_id=None, container=None, path=None):
        if container_id:
            container = self.client.containers.get(container_id=container_id)
        if path is None:
            archive = container.export()
        else:
            archive = container.get_archive(path)[0]
        stream = generator_to_stream(archive)
        tar_file = tarfile.open(fileobj=stream, mode='r|*')
        return [{'key': member.name} for member in tar_file]

    def get_images(self, **kwargs):
        res = []
        if kwargs:
            images = [self.client.images.get(**kwargs)]
        else:
            images = self.client.images.list(**kwargs)
        for image in images:
            res.append({
                # 'attrs': image.attrs,
                'id': image.short_id,
                'labels': str(image.labels),
                'tags': image.tags
            })
        return res


docker_client = DockerUtils()
# docker_client.get_archive('2915ffb1569b')
