<?php

class Package
{

    private $table_name = "packages";

    public $package_id;
    public $tracking_no;
    public $description;
    public $sender_name;
    public $sender_email;
    public $sender_phone;
    public $sender_address;
    public $receiver_name;
    public $receiver_email;
    public $receiver_phone;
    public $receiver_address;
    public $sending_loc;
    public $delivery_loc;
    public $service_price;
    public $delivery_type;
    public $delivery_price;
    public $status;
    public $comment;
    public $created_at;
    public $updated_at;

    public $conn = NULL;


    // Constructor to assign conn
    public function __construct($db){
        $this->conn = $db;
    }

    public function getPackage()
    {

        // select query if student ID is provided
        $query = "SELECT * FROM $this->table_name WHERE package_id=$this->package_id";

        // prepare query statement
        $select_stmt = $this->conn->prepare($query);

        try {
            // execute query
            $select_stmt->execute();
            return ["output" => $select_stmt, "outputStatus" => 1000];
        } catch (Exception $e) {
            return ["output" => $e->getMessage(), "eror" => "Netork issue. Please try again.", "outputStatus" => 1200];
        };
    }


    // Get all packagees
    public function getAllPackages()
    {

        // select query if student ID is provided
        $query = "SELECT * FROM $this->table_name";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        try {
            // execute query
            $stmt->execute();
            return ["output" => $stmt, "outputStatus" => 1000];
        } catch (Exception $e) {
            return ["output" => $e->getMessage(), "erorr" => "Netork issue. Please try again.", "outputStatus" => 1200];
        };
    }

    // create user
    function createPackage()
    {
        // query to insert record
        $query = "INSERT INTO " . $this->table_name . " (class_id, subject_id, term_id, session_id, staff_id, package) VALUES (:class_id, :subject_id, :term_id, :session_id, :staff_id, :package) ";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // bind values
        $stmt->bindParam(":class_id", $this->class_id);
        $stmt->bindParam(":subject_id", $this->subject_id);
        $stmt->bindParam(":term_id", $this->term_id);
        $stmt->bindParam(":session_id", $this->session_id);
        $stmt->bindParam(":staff_id", $this->staff_id);
        $stmt->bindParam(":package", $this->package);

        try {
            $stmt->execute();
            return ["output" => $stmt, "outputStatus" => 1000];
        } catch (Exception $e) {
            return ["output" => $e->getMessage(), "eror" => "Netork issue. Please try again.", "outputStatus" => 1200];
        };
    }


    // update the student
    function updatePackage()
    {
        $this->updated_at = date("Y:m:d H:i:sa");

        // update query
        $query = "UPDATE " . $this->table_name . " SET 
                class_id = :class_id,
                subject_id = :subject_id,
                term_id = :term_id,
                session_id = :session_id,
                 staff_id = :staff_id,
                 package = :package,
                 updated_at = :updated_at
                 WHERE
                 package_id = :package_id";

        // prepare query statement
        $update_stmt = $this->conn->prepare($query);

        // bind new values
        $update_stmt->bindParam(':class_id', $this->class_id);
        $update_stmt->bindParam(':subject_id', $this->subject_id);
        $update_stmt->bindParam(':term_id', $this->term_id);
        $update_stmt->bindParam(':session_id', $this->session_id);
        $update_stmt->bindParam(':staff_id', $this->staff_id);
        $update_stmt->bindParam(':package', $this->package);

        $update_stmt->bindParam(':updated_at', $this->updated_at);

        $update_stmt->bindParam(':package_id', $this->package_id);

        try {
            $update_stmt->execute();
            return ["output" => $update_stmt, "outputStatus" => 1000];
        } catch (Exception $e) {
            return ["output" => $e->getMessage(), "eror" => "Netork issue. Please try again.", "outputStatus" => 1200];
        };
    }

    // delete a user
    function deletePackage()
    {
        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE package_id = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // bind package_id of record to delete
        $stmt->bindParam(1, $this->package_id);

        try {

            $stmt->execute();
            return ["output" => $stmt, "outputStatus" => 1000];
        } catch (Exception $e) {

            return ["output" => $e->getMessage(), "outputStatus" => 1200];
        }
    }


    // search for a particular package(s) in a given column
    function searchPackage($searchstring, $col)
    {

        // select all query
        // $query = "SELECT * FROM " . $this->table_name . " WHERE '$col' LIKE '%$searchstring%'";
        $query = "SELECT * FROM $this->table_name WHERE $col LIKE '%$searchstring%'";


        // prepare query statement
        $update_stmt = $this->conn->prepare($query);

        try {
            // execute query
            $update_stmt->execute();

            return ["output" => $update_stmt, "outputStatus" => 1000];
        } catch (Exception $e) {

            return ["output" => $e->getMessage(), "outputStatus" => 1200];
        }
    }


}
