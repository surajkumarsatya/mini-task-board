CREATE DATABASE IF NOT EXISTS mini_task_board;

CREATE TABLE IF NOT EXISTS mini_task_board.tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status ENUM('todo', 'in-progress', 'done') NOT NULL DEFAULT 'todo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO mini_task_board.tasks (title, status)
VALUES
    ('Complete the Assignment', 'todo'),
    ('Go outside and Play', 'in-progress'),
    ('Make the lunch', 'done');