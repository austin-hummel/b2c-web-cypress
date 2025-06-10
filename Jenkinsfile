pipeline {
    agent any

    environment {
        NODE_VERSION = '18'  // Using a recent LTS version of Node
    }

    options {
        // Keep only the last 10 builds
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // Add timestamps to console output
        timestamps()
    }

    stages {
        stage('Setup') {
            steps {
                // Use Node.js environment
                nodejs(nodeJSInstallationName: "NodeJS ${NODE_VERSION}") {
                    // Install dependencies
                    sh 'npm ci'
                }
            }
        }

        stage('Run Tests') {
            steps {
                nodejs(nodeJSInstallationName: "NodeJS ${NODE_VERSION}") {
                    // Run tests in parallel as configured in package.json
                    sh 'npm run cypress:parallel'
                }
            }
        }
    }

    post {
        always {
            // Archive test results and screenshots
            archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
            
            // Clean workspace
            cleanWs()
        }
        
        failure {
            // Notify on failure - customize this based on your notification preferences
            echo 'Tests failed! Add your notification mechanism here.'
        }
        
        success {
            echo 'Tests passed successfully!'
        }
    }
} 