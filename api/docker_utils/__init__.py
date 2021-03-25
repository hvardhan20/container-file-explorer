import docker
import tarfile
import io


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
        self.docker_conn = None
        self.create_conn(**kwargs)

    def create_conn(self, **kwargs):
        if self.docker_conn is None:
            self.docker_conn = docker.from_env()

    @property
    def docker_conn(self):
        return self._docker_conn

    @docker_conn.setter
    def docker_conn(self, value):
        self._docker_conn = value

    def get_containers(self, **kwargs):
        res = []
        if 'id' in kwargs or 'name' in kwargs:
            containers = [self.docker_conn.containers.get(**kwargs)]
        else:
            containers = self.docker_conn.containers.list(**kwargs)
        for container in containers:
            res.append({
                'attrs': container.attrs,
                'id': container.short_id,
                'labels': container.labels,
                'image': container.image.short_id,
                'status': container.status,
                # 'archive': list(container.get_archive('/'))
            })
            stream = generator_to_stream(container.get_archive('/')[0])
            tar_file = tarfile.open(fileobj=stream, mode='r|*')
            #: Do whatever you want with the tar_file now

            for member in tar_file:
                member_file = tar_file.extractfile(member)
                print(member_file)

        return res

    def get_images(self, **kwargs):
        res = []
        if kwargs:
            images = [self.docker_conn.images.get(**kwargs)]
        else:
            images = self.docker_conn.images.list(**kwargs)
        for image in images:
            res.append({
                'attrs': image.attrs,
                'id': image.short_id,
                'labels': image.labels,
                'tags': image.tags
            })
        return res


docker_instance = DockerUtils()
