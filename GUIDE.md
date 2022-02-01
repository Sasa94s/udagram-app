# Instructions Manual

Step-by-step guide for deploying udagram microservices, setting up RDS database, S3 bucket, and udagram frontend.

- Create a public S3 bucket `k8s-udagram-bucket` with default settings
- Edit Policy of the created bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1625306057759",
      "Principal": "*",
      "Action": "s3:*",
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::k8s-udagram-bucket"
    }
  ]
}
```

- Edit CORS configuration of the bucket:

```json
[
 {
     "AllowedHeaders":[
         "*"
     ],
     "AllowedMethods":[
         "POST",
         "GET",
         "PUT",
         "DELETE",
         "HEAD"
     ],
     "AllowedOrigins":[
         "*"
     ],
     "ExposeHeaders":[

     ]
 }
]
```


- Create RDS database named `k8s-udagram-database`
- Choose `PostgreSQL 13.4-R1`
- Choose `Dev/Test` template
- Add your Master password
- Choose DB instance class `Burstable classes (includes t classes)`
- Leave other fields as default
- Go to VPC, Edit Security Group, Edit Inbound Rules to allow incoming connections
- Test the connection by running `psql -h endpoint -U postgres postgres`


- Create EKS Cluster named `k8s-udagram-cluster`
- Create IAM Role `EKSRole` with the following permissions `AmazonEKSClusterPolicy`, `AmazonEC2ContainerServiceFullAccess` and `AmazonEKSServicePolicy`
- Add Cluster Service Role `EKSRole`
- Choose two subnets to use two different AZs
- Choose existing default Security Group
- Remain others as default and click on Create


- Create IAM Role `EKSNodeGroupRole` with the following permissions:
  - AmazonEKSWorkerNodePolicy
  - AmazonEC2ContainerRegistryReadOnly
  - AmazonEKS_CNI_Policy
- Wait for EKS Cluster `k8s-udagram-cluster` to be Created
- Go to `Configuration`, select Compute tab, click on Add Node Group
- Create Node Group named `k8s-udagram-ngroup`
- Select `EKSNodeGroupRole` IAM Role
- Leave other fields as default
- Select `mx.large` instance type
- Leave other fields as default

Replace credentials in [`aws-secret.yaml`](./aws-secret.yaml) by outputting the below:
```shell
cat ~/.aws/credentials | head -n 3 | base64
```

Replace DB credentials in [`env-secret.yaml`](./env-secret.yaml) by outputting the below:
```shell
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=totallynotmypassword
echo $POSTGRES_USER | base64
echo $POSTGRES_PASSWORD | base64
```

Update config file of kubernetes (Optional):
```shell
aws eks --region us-east-1 update-kubeconfig --name k8s-udagram-cluster
```

Apply env variables and secrets
```shell
kubectl apply -f aws-secret.yaml
kubectl apply -f env-secret.yaml
kubectl apply -f env-configmap.yaml
```
Create `deployments` and `services`:
```shell
kubectl apply -f udagram-api/feed-service/deployment.yaml
kubectl apply -f udagram-api/feed-service/service.yaml

kubectl apply -f udagram-api/users-service/deployment.yaml
kubectl apply -f udagram-api/users-service/service.yaml

kubectl apply -f udagram-frontend/deployment.yaml
kubectl apply -f udagram-frontend/service.yaml

kubectl apply -f udagram-reverseproxy/deployment.yaml
kubectl apply -f udagram-reverseproxy/service.yaml
```
Make `udagram-frontend` publicly accessible with `targetPort`:
```shell
kubectl expose deployment udagram-frontend --type=LoadBalancer --name=publicfrontend
```
Same for `udagram-reverseproxy` (Optional -Already public-):
```shell
kubectl expose deployment reverseproxy --type=LoadBalancer --name=publicreverseproxy
```

### Troubleshooting:

Login into interactive shell of the `pods`:
```shell
kubectl exec --stdin --tty reverseproxy-5d6955c7f8-49x69 -- sh
kubectl exec --stdin --tty udagram-api-feed-service-64d985f9d5-9h422 -- /bin/bash
kubectl exec --stdin --tty udagram-api-user-service-8447746fcf-5p8lc -- /bin/bash
kubectl exec --stdin --tty udagram-frontend-85d859fdd9-t5qgd -- sh
```
Apply changes such as modifications in source code, or in configs (environment variables or secrets), by restarting the `deployment`:
```shell
kubectl rollout restart deployment/udagram-frontend
```
or
```shell
kubectl set image deployment udagram-frontend udagram-frontend=sasa94s/udagram-frontend:latest
kubectl set image deployment reverseproxy reverseproxy=sasa94s/reverseproxy:latest
```
