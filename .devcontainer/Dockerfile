# OpenJDK 17이 포함된 가벼운 slim 이미지를 베이스로 사용 (Spring Boot 용도)
FROM openjdk:17-jdk-slim

# 필수 패키지 설치:
# - curl, gnupg2: Node.js 설치에 필요
# - nano: 텍스트 편집기
# - maven: Java 프로젝트 빌드 도구
# - git: 소스코드 버전 관리
RUN apt update && apt install -y \
    curl gnupg2 nano maven git && \
    # Node.js LTS(예: 18.x) 설치용 스크립트 실행
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    # Node.js 설치
    apt install -y nodejs && \
    # 캐시 정리로 이미지 사이즈 줄이기
    apt clean && rm -rf /var/lib/apt/lists/*

# (선택) yarn 사용 시 주석 제거
# RUN npm install -g yarn

# 컨테이너 내 작업 디렉토리 설정 (VS Code devcontainer에서 이 위치가 루트가 됨)
WORKDIR /workspace

# 개발 중 사용하는 주요 포트를 명시적으로 오픈
# - 8080: Spring Boot
# - 3000: React (CRA)
# - 5173: Vite 개발 서버
# - 5500: Live Server 등 기타 툴
EXPOSE 8080 3000 5173 5500