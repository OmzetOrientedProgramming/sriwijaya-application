# Sriwijaya Front-End Application

[![pipeline status](https://gitlab.cs.ui.ac.id/ppl-fasilkom-ui/2022/Kelas-B/OOP/sriwijaya-application/badges/master/pipeline.svg)](https://gitlab.cs.ui.ac.id/ppl-fasilkom-ui/2022/Kelas-B/OOP/sriwijaya-application/-/commits/master)
[![coverage report](https://gitlab.cs.ui.ac.id/ppl-fasilkom-ui/2022/Kelas-B/OOP/sriwijaya-application/badges/master/coverage.svg)](https://gitlab.cs.ui.ac.id/ppl-fasilkom-ui/2022/Kelas-B/OOP/sriwijaya-application/-/commits/master)

## Description

This is a PWA front-end client repository for Software Engineering Project using Next.js, Typescript, twin.macro, and react-query.

## Installation & Development

1. Clone this repository
   ```
   git clone https://gitlab.cs.ui.ac.id/ppl-fasilkom-ui/2022/Kelas-B/OOP/sriwijaya-application.git
   ```
2. Install all dependencies (using node v16)
   ```
   npm install
   ```
3. Setup environment variable by copying existing `.env.example` file to create new `.env.local` file on your local. This is used to set base url to request from Backend.
4. Start developing feature
   ```
   npm run dev
   ```
   default URL will be at `http://localhost:3000`
5. Build & start PWA
   ```
   npm run build
   npm run start
   ```
6. Run test using Jest
   ```
   npm run test
   ```
