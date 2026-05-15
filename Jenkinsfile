pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "dieys"
        BACKEND_IMAGE  = "${DOCKERHUB_USER}/portfolio-api:${BUILD_NUMBER}"
        FRONTEND_IMAGE = "${DOCKERHUB_USER}/portfolio-react:${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Backend') {
                    steps {
                        sh "docker build -t ${BACKEND_IMAGE} ./portfolio-api"
                    }
                }

                stage('Frontend') {
                    steps {
                        sh "docker build -t ${FRONTEND_IMAGE} ./portfolio-react"
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push "$BACKEND_IMAGE"
                        docker push "$FRONTEND_IMAGE"
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    export BUILD_NUMBER=${BUILD_NUMBER}
                    docker compose down || true
                    docker compose up -d --no-build
                '''
            }
        }
    }

    //
    post {
    success {
        echo "Pipeline exécuté avec succès."
        echo "Frontend : http://localhost:5173"
        echo "Backend  : http://localhost:3000"
        emailext(
            subject: "✅ Jenkins - Build #${BUILD_NUMBER} réussi !",
            body: """
                Bonjour Dieynaba,

                Le pipeline ${JOB_NAME} a été exécuté avec succès !

                Détails :
                - Build     : #${BUILD_NUMBER}
                - Branche   : ${GIT_BRANCH}
                - Commit    : ${GIT_COMMIT}
                - Durée     : ${currentBuild.durationString}

                Voir les logs : ${BUILD_URL}

                Jenkins CI/CD
            """,
            to: 'dsenghor96@gmail.com'
        )
    }
    failure {
        echo "Pipeline échoué. Vérifie les logs Jenkins."
        emailext(
            subject: "❌ Jenkins - Build #${BUILD_NUMBER} échoué !",
            body: """
                Bonjour Dieynaba,

                Le pipeline ${JOB_NAME} a échoué !

                Détails :
                - Build     : #${BUILD_NUMBER}
                - Branche   : ${GIT_BRANCH}
                - Commit    : ${GIT_COMMIT}

                Voir les logs : ${BUILD_URL}

                Jenkins CI/CD
            """,
            to: 'dsenghor96@gmail.com'
        )
    }
    always {
        sh "docker logout"
        echo "🔒 Déconnecté de DockerHub"
    }
}
}