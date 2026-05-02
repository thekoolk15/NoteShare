# 📚 DBMS Practical — Complete Syllabus & Viva Prep

> **Course:** CONT_24CSH-298 :: DATABASE MANAGEMENT SYSTEM  
> **University:** Chandigarh University  
> **Tools:** MySQL Workbench, SQL Shell  
> **Scraped:** April 25, 2026  

---

## At a Glance — 10 Experiments Across 3 Units

| Exp# | Unit | Topic | CO |
|------|------|-------|----|
| 1 | 1 (Practical) | MySQL Installation & Basic SQL | CO1 |
| 2 | 1 (Practical) | DDL — CREATE, ALTER, DROP, TRUNCATE | CO1 |
| 3 | 1 (Practical) | DML — INSERT, SELECT, UPDATE, DELETE | CO1 |
| 4 | 1 (Practical) | Integrity Constraints (PK, FK, CHECK, etc.) | CO2 |
| 5 | 2 (Practical) | SQL Joins (Natural, Inner, Left, Right, Full) | CO3 |
| 6 | 2 (Practical) | Views, Indexes & Cursors | CO3 |
| 7 | 2 (Practical) | Aggregate Functions & GROUP BY / HAVING | CO3 |
| 8 | 2 (Practical) | Subquery Operators — ANY, ALL, IN, EXISTS, UNION, INTERSECT | CO3 |
| 9 | 3 (Practical) | Triggers (Insert, Update, Delete — BEFORE/AFTER) | CO4 |
| 10 | 3 (Practical) | Case Study Design (Company DB / Student Progress / Book Publishing) | CO2, CO5 |

### Course Outcomes (COs)

| CO | Description |
|----|-------------|
| CO1 | Understand fundamental concepts of database systems |
| CO2 | Design and analyze database structures using the relational model and associated design principles |
| CO3 | Apply and analyze relational algebra and relational calculus queries to retrieve and manipulate organizational data |
| CO4 | Develop and evaluate PL/SQL structures such as triggers, procedures, and cursors to implement business logic |
| CO5 | Design and evaluate the concepts of transaction processing, concurrency control, and recovery mechanisms |

### Reference Textbooks
- Elmasri, R., & Navathe, S. B. (2011). *Fundamentals of Database Systems* (6th ed.). Addison-Wesley
- Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database System Concepts* (7th ed.). McGraw-Hill

---

## 📖 Unit 1 (Practical) — SQL Basics & Constraints

---

### Experiment 1 (1.1): MySQL Installation & Basic SQL Commands

**Aim:** Install MySQL and practice basic database and table operations.

**Key SQL Commands:**
```sql
-- Part 1: Installation
mysql -u root -p                          -- Connect to MySQL

-- Part 2: Basic Commands
CREATE DATABASE college;                   -- Create database
USE college;                               -- Select database
SHOW DATABASES;                            -- List all databases
SHOW TABLES;                               -- List all tables

-- Create table
CREATE TABLE student (
    roll INT PRIMARY KEY,
    name VARCHAR(50),
    branch VARCHAR(30),
    marks INT
);

-- Insert records
INSERT INTO student VALUES (1, 'Rahul', 'CSE', 90);
INSERT INTO student VALUES (2, 'Priya', 'ECE', 85);
INSERT INTO student VALUES (3, 'Amit', 'ME', 78);

-- Query data
SELECT * FROM student;
SELECT name, marks FROM student WHERE marks > 80;
```

**Viva Concepts:** MySQL installation, environment variables, `mysql -u root -p`, CREATE DATABASE, USE, SHOW

---

### Experiment 2 (1.2): DDL Queries — CREATE, ALTER, DROP, TRUNCATE

**Aim:** Implement Data Definition Language queries to modify table structure.

**Key SQL Commands:**
```sql
-- ALTER TABLE — Add column
ALTER TABLE student ADD email VARCHAR(50);

-- ALTER TABLE — Modify data type
ALTER TABLE student MODIFY marks FLOAT;

-- ALTER TABLE — Drop column
ALTER TABLE student DROP COLUMN email;

-- RENAME TABLE
RENAME TABLE student TO student_details;

-- TRUNCATE — Delete all rows, keep structure
TRUNCATE TABLE student;

-- DROP — Delete table entirely
DROP TABLE student;

-- DROP DATABASE
DROP DATABASE college;
```

**Viva Q&A:**
- **DDL vs DML?** → DDL changes structure (CREATE, ALTER, DROP), DML changes data (INSERT, UPDATE, DELETE)
- **TRUNCATE vs DELETE?** → TRUNCATE removes all rows, can't use WHERE, faster, auto-commits. DELETE removes specific rows, can rollback
- **TRUNCATE vs DROP?** → TRUNCATE keeps table structure. DROP removes everything

---

### Experiment 3 (1.3): DML Queries — INSERT, SELECT, UPDATE, DELETE

**Aim:** Perform data entry, retrieval, updates, and deletions.

**Key SQL Commands:**
```sql
-- INSERT
INSERT INTO student VALUES (1, 'Amit', 'CSE', 85);
INSERT INTO student VALUES (2, 'Priya', 'ECE', 92);

-- SELECT (all columns)
SELECT * FROM student;

-- SELECT (specific columns with condition)
SELECT name, marks FROM student WHERE branch = 'CSE';

-- UPDATE
UPDATE student SET marks = 95 WHERE roll = 1;

-- DELETE
DELETE FROM student WHERE roll = 4;
```

**Learning Outcomes:**
1. Understand the purpose and importance of DML commands
2. Insert, update, retrieve, and delete data from relational tables
3. Apply conditions and filters while performing data modification
4. Recognize how DML commands impact existing stored data
5. Execute SQL DML queries confidently for real-time database applications

---

### Experiment 4 (1.4): Integrity Constraints

**Aim:** Enforce data integrity using PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK, DEFAULT.

**Key SQL Commands:**
```sql
-- PRIMARY KEY + CHECK constraint
CREATE TABLE Student (
    roll INT PRIMARY KEY,
    name VARCHAR(50),
    age INT CHECK(age >= 18)
);

-- FOREIGN KEY — Parent table
CREATE TABLE Department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);

-- FOREIGN KEY — Child table
CREATE TABLE Student (
    roll INT PRIMARY KEY,
    name VARCHAR(50),
    dept_id INT,
    FOREIGN KEY(dept_id) REFERENCES Department(dept_id)
);

-- Test constraints
INSERT INTO Department VALUES (1, 'CSE');
INSERT INTO Student VALUES (101, 'Amit', 1);       -- ✅ Works
INSERT INTO Student VALUES (101, 'Riya', 1);       -- ❌ Duplicate PK error
INSERT INTO Student VALUES (102, 'Riya', 5);       -- ❌ FK error (dept 5 doesn't exist)
```

**All 6 Constraints:**

| Constraint | Purpose | Example |
|-----------|---------|---------|
| `PRIMARY KEY` | Unique + NOT NULL identifier | `roll INT PRIMARY KEY` |
| `FOREIGN KEY` | Links to another table's PK | `FOREIGN KEY(dept_id) REFERENCES Department(dept_id)` |
| `NOT NULL` | Column can't be null | `name VARCHAR(50) NOT NULL` |
| `UNIQUE` | All values must be distinct | `email VARCHAR(100) UNIQUE` |
| `CHECK` | Validates against a condition | `CHECK(age >= 18)` |
| `DEFAULT` | Auto-fills if no value given | `status VARCHAR(10) DEFAULT 'active'` |

---

## 📖 Unit 2 (Practical) — Advanced SQL Queries

---

### Experiment 5 (2.1): SQL Joins

**Aim:** Retrieve data from multiple tables using different join types. (CO3)

**Sample Tables:**
```sql
-- STUDENT table
CREATE TABLE STUDENT (sid INT, sname VARCHAR(50), dept VARCHAR(10));
INSERT INTO STUDENT VALUES (1, 'Anita', 'CSE'), (2, 'Ravi', 'ECE'), (3, 'Meena', 'CSE'), (4, 'John', 'AIML');

-- DEPARTMENT table
CREATE TABLE DEPARTMENT (dept VARCHAR(10), hod VARCHAR(50));
INSERT INTO DEPARTMENT VALUES ('CSE', 'Dr. Kumar'), ('ECE', 'Dr. Reddy'), ('IT', 'Dr. Mehta');
```

**5 Types of Joins:**
```sql
-- 1. NATURAL JOIN — auto-matches same column names
SELECT * FROM STUDENT NATURAL JOIN DEPARTMENT;
-- Output: Only CSE and ECE rows (AIML excluded, IT excluded)

-- 2. INNER JOIN — explicit ON condition
SELECT s.sid, s.sname, s.dept, d.hod
FROM STUDENT s INNER JOIN DEPARTMENT d ON s.dept = d.dept;

-- 3. LEFT JOIN — all from left, matched from right
SELECT s.sid, s.sname, s.dept, d.hod
FROM STUDENT s LEFT JOIN DEPARTMENT d ON s.dept = d.dept;
-- AIML student shows with NULL hod

-- 4. RIGHT JOIN — all from right, matched from left
SELECT s.sid, s.sname, s.dept, d.hod
FROM STUDENT s RIGHT JOIN DEPARTMENT d ON s.dept = d.dept;
-- IT dept shows with NULL student

-- 5. FULL OUTER JOIN (MySQL workaround using UNION)
SELECT * FROM STUDENT s LEFT JOIN DEPARTMENT d ON s.dept = d.dept
UNION
SELECT * FROM STUDENT s RIGHT JOIN DEPARTMENT d ON s.dept = d.dept;
```

**Viva Q&A:**
- **INNER vs OUTER?** → INNER returns only matching rows. OUTER (LEFT/RIGHT/FULL) includes non-matching rows with NULLs
- **NATURAL vs INNER?** → NATURAL auto-detects common columns. INNER requires explicit ON condition
- **MySQL FULL JOIN?** → MySQL doesn't support FULL OUTER JOIN directly. Use UNION of LEFT + RIGHT joins

---

### Experiment 6 (2.2): Views, Indexes & Cursors

**Aim:** Create virtual tables (views), optimize queries (indexes), and process rows one-by-one (cursors). (CO3)

**Sample Table:**
```sql
CREATE TABLE emp (emp_id INT PRIMARY KEY, emp_name VARCHAR(50), dept VARCHAR(20), salary INT);
INSERT INTO emp VALUES 
    (101, 'Anita', 'HR', 30000),
    (102, 'Rahul', 'IT', 45000),
    (103, 'Neha', 'IT', 50000),
    (104, 'Amit', 'Finance', 40000);
```

**Part A: Indexes**
```sql
-- Create index
CREATE INDEX idx_salary ON emp(salary);

-- Use index (automatically speeds up WHERE on salary)
SELECT * FROM emp WHERE salary > 40000;
-- Output: Rahul (45000), Neha (50000)

-- Show indexes
SHOW INDEX FROM emp;

-- Drop index
DROP INDEX idx_salary ON emp;
```

**Part B: Views**
```sql
-- Create view (virtual table)
CREATE VIEW high_salary_emp AS
SELECT emp_name, dept, salary FROM emp WHERE salary > 35000;

-- Query the view
SELECT * FROM high_salary_emp;

-- Drop view
DROP VIEW high_salary_emp;
```

**Part C: Cursors** (row-by-row processing in stored procedures)
```sql
DELIMITER //
CREATE PROCEDURE process_emp()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_name VARCHAR(50);
    DECLARE v_salary INT;
    
    DECLARE cur CURSOR FOR SELECT emp_name, salary FROM emp;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO v_name, v_salary;
        IF done THEN LEAVE read_loop; END IF;
        -- Process each row
        SELECT CONCAT(v_name, ': ', v_salary) AS result;
    END LOOP;
    CLOSE cur;
END //
DELIMITER ;

CALL process_emp();
```

**Viva Q&A:**
- **View vs Table?** → View is virtual, doesn't store data. Table stores data physically
- **Why use Index?** → Speeds up SELECT queries on frequently searched columns. Trade-off: slower INSERT/UPDATE
- **Cursor use case?** → When you need to process rows one at a time (e.g., complex business logic per row)

---

### Experiment 7 (2.3): Aggregate Functions & GROUP BY / HAVING

**Aim:** Perform statistical analysis using aggregate functions with grouping. (CO3)

**Sample Table:** `emp (emp_id, emp_name, dept, salary)` — same as Exp 6

**Key Queries:**
```sql
-- Query 1: COUNT employees per department
SELECT dept, COUNT(*) AS total_employees FROM emp GROUP BY dept;

-- Query 2: SUM of salaries department-wise
SELECT dept, SUM(salary) AS total_salary FROM emp GROUP BY dept;
-- Output: HR=58000, IT=95000, SALES=82000

-- Query 3: AVERAGE salary per department
SELECT dept, AVG(salary) AS avg_salary FROM emp GROUP BY dept;
-- Output: HR=29000, IT=47500, ...

-- Query 4: MAX and MIN salary
SELECT dept, MAX(salary) AS highest, MIN(salary) AS lowest FROM emp GROUP BY dept;

-- Query 5: HAVING clause (filter groups)
SELECT dept, AVG(salary) AS avg_salary 
FROM emp 
GROUP BY dept 
HAVING AVG(salary) > 40000;

-- Query 6: ORDER BY
SELECT * FROM emp ORDER BY salary DESC;
```

**5 Aggregate Functions:**

| Function | Purpose | Example |
|----------|---------|---------|
| `COUNT()` | Number of rows | `COUNT(*)` |
| `SUM()` | Total of values | `SUM(salary)` |
| `AVG()` | Average of values | `AVG(salary)` |
| `MAX()` | Largest value | `MAX(salary)` |
| `MIN()` | Smallest value | `MIN(salary)` |

**Viva Q&A:**
- **WHERE vs HAVING?** → WHERE filters rows BEFORE grouping. HAVING filters groups AFTER GROUP BY
- **Can you use aggregate in WHERE?** → No! Use HAVING for aggregate conditions

---

### Experiment 8 (2.4): Subquery Operators — ANY, ALL, IN, EXISTS, UNION, INTERSECT

**Aim:** Implement queries using ANY, ALL, IN, EXISTS, UNION, INTERSECT. (CO3)

**Sample Tables:**
```sql
-- Table 1: EMP
CREATE TABLE EMP (emp_id INT, emp_name VARCHAR(50), dept VARCHAR(20), salary INT);
INSERT INTO EMP VALUES (101,'Amit','HR',30000), (102,'Rahul','IT',45000),
    (103,'Neha','IT',50000), (104,'Priya','HR',28000), (105,'Karan','FINANCE',60000);

-- Table 2: DEPARTMENT
-- Table 3: PROJECT_TEAM
```

**Key Queries:**
```sql
-- ANY: salary > any HR employee's salary
SELECT * FROM EMP WHERE salary > ANY (SELECT salary FROM EMP WHERE dept = 'HR');

-- ALL: salary > all HR employees' salaries
SELECT * FROM EMP WHERE salary > ALL (SELECT salary FROM EMP WHERE dept = 'HR');

-- IN: employees in specific departments
SELECT * FROM EMP WHERE dept IN ('IT', 'FINANCE');

-- EXISTS: departments that have employees
SELECT * FROM DEPARTMENT d WHERE EXISTS (SELECT 1 FROM EMP e WHERE e.dept = d.dept);

-- UNION: combine results from two queries (removes duplicates)
SELECT dept FROM EMP UNION SELECT dept FROM DEPARTMENT;

-- UNION ALL: combine keeping duplicates
SELECT dept FROM EMP UNION ALL SELECT dept FROM DEPARTMENT;

-- INTERSECT (MySQL workaround using IN)
SELECT dept FROM EMP WHERE dept IN (SELECT dept FROM DEPARTMENT);
```

**Viva Q&A:**
- **ANY vs ALL?** → ANY: true if condition matches at least ONE subquery value. ALL: true if condition matches EVERY subquery value
- **IN vs EXISTS?** → IN matches against a list of values. EXISTS checks if subquery returns any rows (better for large datasets)
- **UNION vs UNION ALL?** → UNION removes duplicates. UNION ALL keeps all rows including duplicates
- **INTERSECT in MySQL?** → MySQL doesn't have INTERSECT. Use `IN` with subquery or `INNER JOIN` as workaround

---

## 📖 Unit 3 (Practical) — Triggers & Case Study

---

### Experiment 9 (3.1): Triggers (Insert, Update, Delete)

**Aim:** Implement and test database triggers that execute automatically in response to INSERT, UPDATE, and DELETE operations. (CO4)

**Theory:**
- A **trigger** is a stored program that executes automatically in response to a database event (INSERT, UPDATE, DELETE)
- Can execute **BEFORE** or **AFTER** the event
- Runs **FOR EACH ROW** affected
- Uses `NEW` (new data) and `OLD` (old data) keywords

**Key SQL Commands:**
```sql
-- Create employee table
CREATE TABLE emp (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_name VARCHAR(50),
    salary DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create audit log table
CREATE TABLE emp_audit (
    audit_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_id INT,
    action VARCHAR(20),
    old_salary DECIMAL(10,2),
    new_salary DECIMAL(10,2),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BEFORE INSERT trigger — auto-adjust salary
DELIMITER //
CREATE TRIGGER before_insert_emp
BEFORE INSERT ON emp
FOR EACH ROW
BEGIN
    SET NEW.salary = NEW.salary + 1000;  -- Add bonus on insert
END //
DELIMITER ;

-- AFTER UPDATE trigger — audit trail
DELIMITER //
CREATE TRIGGER after_update_emp
AFTER UPDATE ON emp
FOR EACH ROW
BEGIN
    INSERT INTO emp_audit (emp_id, action, old_salary, new_salary)
    VALUES (OLD.emp_id, 'UPDATE', OLD.salary, NEW.salary);
END //
DELIMITER ;

-- AFTER DELETE trigger — log deletion
DELIMITER //
CREATE TRIGGER after_delete_emp
AFTER DELETE ON emp
FOR EACH ROW
BEGIN
    INSERT INTO emp_audit (emp_id, action, old_salary, new_salary)
    VALUES (OLD.emp_id, 'DELETE', OLD.salary, NULL);
END //
DELIMITER ;

-- Test triggers
INSERT INTO emp (emp_name, salary) VALUES ('Rahul', 50000);
-- Actual salary stored: 51000 (BEFORE INSERT added 1000)

UPDATE emp SET salary = 60000 WHERE emp_id = 1;
-- Audit log: old=51000, new=60000

DELETE FROM emp WHERE emp_id = 1;
-- Audit log: action='DELETE', old=60000, new=NULL

-- View all triggers
SHOW TRIGGERS;

-- Drop a trigger
DROP TRIGGER before_insert_emp;
```

**6 Trigger Types:**

| Timing | INSERT | UPDATE | DELETE |
|--------|--------|--------|--------|
| **BEFORE** | `BEFORE INSERT` | `BEFORE UPDATE` | `BEFORE DELETE` |
| **AFTER** | `AFTER INSERT` | `AFTER UPDATE` | `AFTER DELETE` |

**Viva Q&A:**
- **What is a trigger?** → Stored program that auto-executes on INSERT/UPDATE/DELETE events
- **BEFORE vs AFTER?** → BEFORE can modify data before it's saved. AFTER runs after data is committed (good for logging)
- **NEW vs OLD?** → NEW = incoming data (INSERT/UPDATE). OLD = existing data (UPDATE/DELETE). INSERT has no OLD, DELETE has no NEW
- **Use cases?** → Audit logging, auto-calculations, enforcing business rules, maintaining derived data

---

### Experiment 10 (3.2): Design a Case Study

**Aim:** Design a complete case-study database system incorporating ER design, relational schema, and example transactions demonstrating concurrency control and recovery. (CO2, CO5)

**Case Study Options:**
1. **Company Database**
2. **Student Progress Monitoring System**
3. **Book Publishing Company**

**Design Elements Required:**
1. **ER Diagram** — Entities, Attributes, Relationships (1:1, 1:N, M:N)
2. **Relational Schema** — Mapping ER to normalized tables
3. **Sample Transactions** — INSERT/UPDATE/DELETE demonstrating business logic
4. **Concurrency Control** — Locking mechanisms, transaction isolation
5. **Recovery Considerations** — COMMIT, ROLLBACK, SAVEPOINT

**Example: Student Progress Monitoring**
```sql
-- Entities
CREATE TABLE Student (student_id INT PRIMARY KEY, name VARCHAR(50), email VARCHAR(100) UNIQUE);
CREATE TABLE Course (course_id INT PRIMARY KEY, course_name VARCHAR(100), credits INT);
CREATE TABLE Enrollment (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    grade VARCHAR(2),
    FOREIGN KEY(student_id) REFERENCES Student(student_id),
    FOREIGN KEY(course_id) REFERENCES Course(course_id)
);
CREATE TABLE Progress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    enrollment_id INT,
    assignment_score DECIMAL(5,2),
    exam_score DECIMAL(5,2),
    FOREIGN KEY(enrollment_id) REFERENCES Enrollment(enrollment_id)
);

-- Transaction example
START TRANSACTION;
    INSERT INTO Enrollment (student_id, course_id) VALUES (1, 101);
    UPDATE Student SET name = 'Updated Name' WHERE student_id = 1;
COMMIT;

-- Rollback example
START TRANSACTION;
    DELETE FROM Student WHERE student_id = 1;
ROLLBACK;  -- Undo the delete
```

---

## 🎯 Viva Quick-Reference Cheat Sheet

### SQL Command Categories
```
DDL (Structure)  → CREATE, ALTER, DROP, TRUNCATE, RENAME
DML (Data)       → INSERT, SELECT, UPDATE, DELETE
DCL (Access)     → GRANT, REVOKE
TCL (Txn)        → COMMIT, ROLLBACK, SAVEPOINT
```

### Most Common Viva Questions

| # | Question | Answer |
|---|----------|--------|
| 1 | DDL vs DML? | DDL modifies structure, DML modifies data |
| 2 | DELETE vs TRUNCATE vs DROP? | DELETE: row-by-row, rollbackable. TRUNCATE: all rows, no rollback. DROP: removes table entirely |
| 3 | PRIMARY KEY vs UNIQUE? | PK: one per table, no NULLs. UNIQUE: multiple allowed, allows one NULL |
| 4 | WHERE vs HAVING? | WHERE filters before GROUP BY. HAVING filters after GROUP BY |
| 5 | INNER vs LEFT vs RIGHT JOIN? | INNER: matching only. LEFT: all left + matched right. RIGHT: all right + matched left |
| 6 | View vs Table? | View is virtual (no storage), Table stores data physically |
| 7 | Why use Index? | Speeds up SELECT but slows INSERT/UPDATE. B-Tree structure |
| 8 | ANY vs ALL? | ANY: true if ≥1 match. ALL: true if all match |
| 9 | IN vs EXISTS? | IN: matches list. EXISTS: checks subquery returns rows. EXISTS better for large datasets |
| 10 | UNION vs UNION ALL? | UNION removes duplicates. UNION ALL keeps all |
| 11 | What is a Trigger? | Auto-executing stored program on INSERT/UPDATE/DELETE |
| 12 | BEFORE vs AFTER trigger? | BEFORE can modify incoming data. AFTER good for logging/audit |
| 13 | NEW vs OLD in triggers? | NEW = incoming data, OLD = existing data |
| 14 | What is a Cursor? | Mechanism to process query results row-by-row |
| 15 | COMMIT vs ROLLBACK? | COMMIT saves changes permanently. ROLLBACK undoes changes |

### Progression Map
```
Installation → DDL → DML → Constraints → Joins → Views/Index/Cursor → Aggregation → Subqueries → Triggers → Case Study
     1            2      3        4           5           6                   7              8            9          10
```

> [!TIP]
> **For today's viva**, focus on Experiments 5-9 (Joins, Views/Index, Aggregation, Subqueries, Triggers) as these are the advanced topics most likely to be asked. Be ready to write SQL queries on the spot, especially JOINs and Triggers.

> [!IMPORTANT]
> **Experiment-3.3 and Experiment-3.4 are empty** — no content uploaded by the instructor.
