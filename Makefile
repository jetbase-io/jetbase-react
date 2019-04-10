# Makefile
whoami := $(shell whoami)

install2:
	docker-compose run --rm ecomting_frontend npm install

npm-install:
	docker-compose run --rm ecomting_frontend npm install --save $(package) && sudo chown ${whoami}:${whoami} package.json


install:
	ansible-galaxy install -r devops/requirements.yml -p devops/roles

provisioning:
	ansible-playbook devops/provisioning.yml -i devops/hosts/production


build:
	docker build -t ecomting/ecomting-frontend .

push: build
	docker push ecomting/ecomting-frontend

deploy: push
	ansible-playbook -i devops/hosts/production devops/deploy.yml
