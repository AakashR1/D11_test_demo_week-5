CREATE TABLE IF NOT EXISTS developer(
    dev_id INT PRIMARY KEY,
    dev_email VARCHAR(20),
    dev_password VARCHAR(20),
    dev_name VARCHAR(10),
    dev_image VARCHAR(30),
    team_id INT,
    dob DATE,
    isActive BOOLEAN DEFAULT true,
    FOREIGN KEY(team_id) REFERENCES teams(team_id) ON DELETE SET NULL

);