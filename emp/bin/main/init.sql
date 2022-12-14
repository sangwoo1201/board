CREATE TABLE IF NOT EXISTS DEPT (
    DEPTNO DECIMAL(2),
    DNAME VARCHAR(14),
    LOC VARCHAR(13),
    CONSTRAINT PK_DEPT PRIMARY KEY (DEPTNO) 
);

CREATE TABLE IF NOT EXISTS EMP (
    EMPNO DECIMAL(4),
    ENAME VARCHAR(10),
    JOB VARCHAR(9),
    MGR DECIMAL(4),
    HIREDATE DATE,
    SAL DECIMAL(7,2),
    COMM DECIMAL(7,2),
    DEPTNO DECIMAL(2),
    IS_USE tinyint(1) DEFAULT true,
    CONSTRAINT PK_EMP PRIMARY KEY (EMPNO),
    CONSTRAINT FK_DEPTNO FOREIGN KEY (DEPTNO) REFERENCES DEPT(DEPTNO) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS SALGRADE ( 
    GRADE TINYINT,
    LOSAL SMALLINT,
    HISAL SMALLINT
);

CREATE TABLE IF NOT EXISTS emp_logs(
	log_id bigint(20) AUTO_INCREMENT PRIMARY KEY COMMENT '로그 번호',
	ip VARCHAR(50) COMMENT '사용자 아이피',
	url VARCHAR(100) COMMENT '접속 경로',
	http_method VARCHAR(10) COMMENT 'http method',
	create_at DATETIME COMMENT '접속 시간'
)