<?php

    class Database{
    
        // specify your own database credentials
        private $host = "";
        private $db_name = "";
        private $username = "";
        private $password = "";
        public $conn = NULL;

        public function __construct($hostarr){
            $this->host = $hostarr["dbconnx"]["HOST"]; //replace with your own host
            $this->db_name = $hostarr["dbconnx"]["DB_NAME"]; //replace with your own db name
            $this->username = $hostarr["dbconnx"]["USERNAME"]; //replace with your own db username
            $this->password = $hostarr["dbconnx"]["PASSWORD"]; //replace with your own password
        }
    
        // get the database connection
        public function getConnection()
        {

            // $this->host = $_SERVER["HOST"]; //replace with your own host
            // $this->db_name = $_SERVER["DB_NAME"]; //replace with your own db name
            // $this->username = $_SERVER["USERNAME"]; //replace with your own db username
            // $this->password = $_SERVER["PASSWORD"]; //replace with your own password

            try{
                $this->conn = new PDO("mysql:host=$this->host;dbname=$this->db_name", $this->username, $this->password);
                $this->conn->exec("set names utf8");
                // echo "Connected";
                return $this->conn;

            }catch(PDOException $exception){
                echo "Connection error: " . $exception->getMessage();
            }
    
            // return $this->conn;

        }


    }


    // $bdconnect = new Database();
    // $bdconnect->getConnection();





