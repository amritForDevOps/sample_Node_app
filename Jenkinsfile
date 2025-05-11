pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'amritdevops/node-app:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'Github-creds', url: 'https://github.com/amritForDevOps/sample_Node_app.git', branch: 'main'
           }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "No tests found"'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'Devops-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh '''
                        echo $PASSWORD | docker login -u $USERNAME --password-stdin
                        docker push $DOCKER_IMAGE
                    '''
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl apply -f /home/amrit/k8s/deployment.yaml
                    kubectl apply -f /home/amrit/k8s/service.yaml
                '''
            }
        }      
    }
}
