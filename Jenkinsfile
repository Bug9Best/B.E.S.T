pipeline {
  agent any
  environment {
    // DOCKER_IMAGE = 'bug9best/fastapi-webhook:latest'
    DOCKER_CREDENTIALS = credentials('dockerhub')
  }

  stages {
    stage('jenkins') {
      steps {
        sh 'echo Start Jenkins'
        sh 'echo docker : user = $DOCKER_CREDENTIALS_USR : pass = $DOCKER_CREDENTIALS_PSW'
      }
    }

stage('Build Docker Image') {
            steps {
                    // Build the Docker image

                    dir('./') {
                       sh 'echo "Running in $(pwd)"'
                       sh 'docker compose build'
                    }

            }
        }

    stage('deploy image'){
      steps {
        sh 'docker compose up -d'
      }
    }
  }
}