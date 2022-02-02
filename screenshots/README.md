# Screenshots
To help review the infrastructure, please check the following screenshots in this directory:

## Deployment Pipeline
* DockerHub showing containers that you have pushed
* GitHub repository’s settings showing your Travis webhook (can be found in Settings - Webhook)
* Travis CI showing a successful build and deploy job

## Travis CI
* To verify Successful build and deploy jobs in Travis CI
![Travis CI - Dashboard](travis-dashboard.png)

<details>
    <summary>Click here to show screenshots</summary>

![Travis CI - Feed Service](travis-udagram-api-feed-service.png)
![Travis CI - User Service](travis-udagram-api-users-service.png)
![Travis CI - Frontend](travis-udagram-frontend.png)
![Travis CI - Reverse Proxy](travis-udagram-reverseproxy.png)
</details>

## Docker
* To verify Docker images pushed to Docker Hub registry
![Docker Hub - Dashboard](docker-hub.png)

## Kubernetes
* To verify Kubernetes deployments are created
```bash
kubectl get deployments
```
![Deployments](deployments.png)
* To verify Kubernetes pods are deployed properly
```bash
kubectl get pods
```
![Pods](pods.png)
* To verify Kubernetes services are properly set up
```bash
kubectl get services 
```
![Services](services.png)
```bash
kubectl describe services
```
<details>
    <summary>Click here to show screenshots</summary>

![Describe Services - 1](describe-services-1.png)
![Describe Services - 2](describe-services-2.png)
![Describe Services - 3](describe-services-3.png)
![Describe Services - 4](describe-services-4.png)
![Describe Services - 5](describe-services-5.png)
![Describe Services - 6](describe-services-6.png)
</details>

* To verify reverse proxy working as expected
```bash
curl --location --request GET 'http://a3d585197e2a64e86bd7eed6d122d3c2-220395696.us-east-1.elb.amazonaws.com:8080/api/v0/feed'
curl --location --request POST 'http://a3d585197e2a64e86bd7eed6d122d3c2-220395696.us-east-1.elb.amazonaws.com:8000/api/v0/users/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email":"hello@gmail.com",
	"password":"fancypass"
}'
```
![Reverse Proxy - 1](reverse-proxy-1.png)
![Reverse Proxy - 2](reverse-proxy-2.png)
* To verify that you have horizontal scaling set against CPU usage
```bash
kubectl describe hpa
```
![HPA](horizontal-pod-autoscaler.png)
* To verify that you have set up logging with a backend application
```bash
kubectl logs {pod_name}
```
<details>
    <summary>Click here to show screenshots</summary>

![Logs - Reverse Proxy](logs-reverseproxy.png)
![Logs - Feed Service](logs-feed-service.png)
![Logs - User Service](logs-user-service.png)
![Logs - Frontend](logs-frontend.png)
</details>
