import db from './clients/db.mysql.js';


async function main() {
    await db.query(`
        CREATE TABLE IF NOT EXISTS users
        (
            id bigint auto_increment primary key ,
            first_name varchar(50) not null ,
            last_name varchar(50) not null ,
            email varchar(100) not null unique ,
            password  VARCHAR(50) not null
        )
    `);
    await db.query(`
            CREATE TABLE IF NOT EXISTS posts (
              id BIGINT AUTO_INCREMENT PRIMARY KEY,
              title VARCHAR(255) NOT NULL,
              description TEXT NOT NULL,
              user_id BIGINT NOT NULL,
              FOREIGN KEY (user_id) REFERENCES users(id)
            )
    `);
    await db.query(`
            CREATE TABLE IF NOT EXISTS comments (
              id BIGINT AUTO_INCREMENT PRIMARY KEY,
              comment_content VARCHAR(255) NOT NULL,
              user_id BIGINT NOT NULL,
              post_id BIGINT NOT NULL,
              FOREIGN KEY (user_id) REFERENCES users(id),
              FOREIGN KEY (post_id) REFERENCES posts(id)
            )
    `);
}
main().catch((err) => {
    console.log(err);
})