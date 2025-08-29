# NeuroLog

## Local env
```shell
docker-compose up -d

cd app
npm run dev
```

http://localhost:8080/


```shell
docker-compose exec api -d
```



## DEPLOYMENT Services
```shell
# FRONTEND
https://vercel.com/sergiogmuros-projects/neurolog-app

# API
https://dashboard.render.com/project/prj-d0poanumcj7s73eclk4g

# DB
https://supabase.com/dashboard/project/dyulemymihamxlweexdu

# Backend Monitor
https://downtimemonkey.com/website-downtime-monitors.php
```


## RUN ANDROID
Install Java 21
```shell
brew install openjdk@21
```
Set Java Version
```shell
vim ~/.zshrc
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
export PATH=$JAVA_HOME/bin:$PATH

# Use it
sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk
source ~/.zshrc
```
Use node 22
```shell
nvm use 22
```

Execute
```shell
rm -rf dist  
npm run build
cd android
./gradlew clean
cd ..
npx cap run android
```
