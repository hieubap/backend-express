## AIRSENCE-20212
1. Intro

2. How to install
   ```
    yarn add 
   ```
   > if run error on window OS follow link https://www.nextofwindows.com/fix-unable-to-run-yarn-in-windows-terminal-powershell
3. How to run
    ```
    yarn start
    ```
4. Database setup & migration
    run all migration in folder 
    ```
        npx sequelize-cli db:migration
    ```
    undo migration : 
    ```
        npx sequelize-cli db:migrate:undo
    ```
    undo to specific migration : 
    ```
        npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
    ```

5. Author
   - Phung Van Sy
   - Pham Trong Phung
   - Vu Van Dai
   - Phan Ha Duy
   - Tran Khuong Duy