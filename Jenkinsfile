pipeline {
    agent any

    environment {
        DOCKERHUB_USER  = "dieys"
        BACKEND_IMAGE   = "${DOCKERHUB_USER}/portfolio-api:${BUILD_NUMBER}"
        FRONTEND_IMAGE  = "${DOCKERHUB_USER}/portfolio-react:${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo "✅ Code récupéré depuis : ${GIT_BRANCH}"
                echo "📌 Commit : ${GIT_COMMIT}"
            }
        }

        stage('Build Images Docker') {
            parallel {
                stage('Backend') {
                    steps {
                        echo "🔨 Build image backend..."
                        sh "docker build -t ${BACKEND_IMAGE} ./portfolio-api"
                    }
                }

                stage('Frontend') {
                    steps {
                        echo "🔨 Build image frontend..."
                        sh "docker build -t ${FRONTEND_IMAGE} ./portfolio-react"
                    }
                }
            }
        }

        stage('Push sur DockerHub') {
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
                        echo "✅ Images pushées sur DockerHub !"
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Déploiement de l'application..."

                sh '''
                    export BUILD_NUMBER=${BUILD_NUMBER}

                    echo "📁 Dossier actuel :"
                    pwd

                    echo "📄 Fichiers présents :"
                    ls -la

                    echo "📌 Build number utilisé : $BUILD_NUMBER"

                    echo "🔍 Contenu du docker-compose.yml utilisé par Jenkins :"
                    cat docker-compose.yml

                    echo "🔍 Configuration Docker Compose finale :"
                    docker compose -f docker-compose.yml config

                    echo "🔍 Vérification des images locales :"
                    docker images | grep "dieys/portfolio" || true

                    echo "🧹 Arrêt des anciens containers..."
                    docker compose -f docker-compose.yml down || true

                    echo "🚀 Démarrage des containers sans rebuild..."
                    docker compose -f docker-compose.yml up -d --no-build

                    echo "📦 Containers actifs :"
                    docker ps
                '''

                echo "✅ Application déployée !"
            }
        }
    }

    post {
        success {
            echo "🎉 Pipeline exécuté avec succès !"
            echo "🌐 Frontend  : http://localhost:5173"
            echo "🔧 Backend   : http://localhost:3000"
        }

        failure {
            echo "❌ Le pipeline a échoué — vérifie les logs !"
        }

        always {
            sh "docker logout || true"
            echo "🔒 Déconnecté de DockerHub"
        }
    }
}