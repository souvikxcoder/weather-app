pipeline {
    agent any

    environment {
        IMAGE_NAME = 'weather-app'
        CONTAINER_NAME = 'weather-app-container'
        PORT = '3000'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/souvikxcoder/weather-app'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $IMAGE_NAME .'
                }
            }
        }

        stage('Stop and Remove Old Container') {
            steps {
                script {
                    sh '''
                    docker stop $CONTAINER_NAME || true
                    docker rm $CONTAINER_NAME || true
                    '''
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'OPENWEATHER_API_KEY', variable: 'OPENWEATHER_API_KEY')]) {
                        sh '''
                        docker run -d --name $CONTAINER_NAME -p $PORT:3000 \
                          -e OPENWEATHER_API_KEY=$OPENWEATHER_API_KEY \
                          $IMAGE_NAME
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished'
        }
    }
}
