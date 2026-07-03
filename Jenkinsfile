pipeline {
    agent any

    environment {
        BACKEND_IMAGE  = 'jk-tourism-backend'
        FRONTEND_IMAGE = 'jk-tourism-frontend'
        IMAGE_TAG      = "${env.BUILD_NUMBER ?: 'latest'}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend — Test & Package') {
            steps {
                dir('tourisminformation') {
                    sh './mvnw clean test package -B -DskipTests=false'
                }
            }
            post {
                success {
                    archiveArtifacts artifacts: 'tourisminformation/target/*.jar', fingerprint: true
                }
            }
        }

        stage('Frontend — Install & Build') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
            post {
                success {
                    archiveArtifacts artifacts: 'frontend/dist/**/*', fingerprint: true
                }
            }
        }

        stage('Docker — Build Images') {
            parallel {
                stage('Backend Image') {
                    steps {
                        dir('tourisminformation') {
                            sh "docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} -t ${BACKEND_IMAGE}:latest ."
                        }
                    }
                }
                stage('Frontend Image') {
                    steps {
                        dir('frontend') {
                            sh "docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} -t ${FRONTEND_IMAGE}:latest ."
                        }
                    }
                }
            }
        }

        stage('Docker — Smoke Test') {
            steps {
                sh '''
                    docker compose down --remove-orphans 2>/dev/null || true
                    docker compose up -d --build
                    sleep 15
                    curl -sf http://localhost:8080/api/health
                    curl -sf http://localhost/api/health
                    curl -sf http://localhost/ | head -c 200
                '''
            }
            post {
                always {
                    sh 'docker compose down --remove-orphans 2>/dev/null || true'
                }
            }
        }
    }

    post {
        success {
            echo "Build ${IMAGE_TAG} completed — images: ${BACKEND_IMAGE}, ${FRONTEND_IMAGE}"
        }
        failure {
            echo 'Pipeline failed. Check backend tests, frontend build, or Docker logs.'
        }
        cleanup {
            cleanWs()
        }
    }
}
