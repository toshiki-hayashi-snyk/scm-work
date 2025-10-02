FROM ubuntu:14.04   # EOLで多数の脆弱性あり
RUN apt-get update && apt-get install -y curl
