#!/bin/bash

# Go to frappe_docker workspace folder
cd /Users/etl/Desktop/work/frappe_docker || exit 1

# Run devcontainer up
if devcontainer up --workspace-folder /Users/etl/Desktop/work/frappe_docker; then
  echo "✅ Devcontainer started successfully."

  # Run docker exec only if the above succeeded
  docker exec -it frappe_docker_devcontainer-frappe-1 /bin/bash
else
  echo "❌ Failed to start devcontainer."
  exit 1
fi
