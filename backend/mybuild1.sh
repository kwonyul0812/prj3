# react project build
cd ../frontend
npm run build

# index.html, main.js 복사(이동) : dist -> static
cd ../backend
rm -rf src/main/resources/static
rm -rf build
mv ../frontend/dist src/main/resources/static


# spring project build
./gradlew bootJar

# build image
docker build -t kwonyul99/prj3 .
docker push kwonyul99/prj3


# 컨테이너 멈추고
ssh -i src/main/resources/secret/key0527.pem ubuntu@43.201.114.72 'docker stop saengjoncoding'
# 컨테이너 삭제
ssh -i src/main/resources/secret/key0527.pem ubuntu@43.201.114.72 'docker rm saengjoncoding'
# pull image
ssh -i src/main/resources/secret/key0527.pem ubuntu@43.201.114.72 'docker pull kwonyul99/prj3'
# 컨테이너 실행
ssh -i src/main/resources/secret/key0527.pem ubuntu@43.201.114.72 'docker run -d -p 8080:8080 --restart always --name saengjoncoding kwonyul99/prj3'

# 코드 수정후 터미널에서 ./mybuild1.sh 실행하여 반영할것.