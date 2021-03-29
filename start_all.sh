#!/bin/bash

nginx & gunicorn -w 2 -b 0.0.0.0:$REACT_APP_FLASK_PORT api:app
#CMD ["nginx", "-g", "daemon off;"]
#ENTRYPOINT ["gunicorn", "api:app"]
#CMD ["-w", "2", "-b", "0.0.0.0:8000"]