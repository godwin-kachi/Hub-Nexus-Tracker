<?php

class Package
{

    private $table_name = "packages";

    public $package_id;
    public $tracking_no;
    public $description;
    public $quantity;
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
    public $delivery_status;
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
        // $query = "SELECT * FROM $this->table_name WHERE package_id=$this->package_id";

        $query = "SELECT packages.*, pstatus.package_status_id, pstatus.ps_created_at, pstatus.ps_updated_at, plocation.package_loc, plocation.pl_created_at, plocation.pl_updated_at FROM $this->table_name LEFT JOIN pstatus ON packages.package_id=pstatus.package_id LEFT JOIN plocation ON packages.package_id=plocation.package_id WHERE packages.package_id=$this->package_id";

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
        // Generate tracking no
        $this->genTrackNo();
        $this->delivery_status = 0;

        // query to insert record
        $query = "INSERT INTO $this->table_name (tracking_no, description, quantity, sender_name, sender_email, sender_phone, sender_address,receiver_name, receiver_email, receiver_phone, receiver_address, sending_loc, delivery_loc, service_price, delivery_type, delivery_price, delivery_status, comment ) VALUES (:tracking_no, :description, :quantity, :sender_name, :sender_email, :sender_phone, :sender_address, :receiver_name, :receiver_email, :receiver_phone, :receiver_address, sending_loc, delivery_loc, service_price, delivery_type, delivery_price, delivery_status, comment ) ";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // bind values
        $stmt->bindParam(":tracking_no", $this->tracking_no);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":quantity", $this->quantity);
        $stmt->bindParam(":sender_name", $this->sender_name);
        $stmt->bindParam(":sender_email", $this->sender_email);
        $stmt->bindParam(":sender_phone", $this->sender_phone);
        $stmt->bindParam(":sender_address", $this->sender_address);
        $stmt->bindParam(":receiver_name", $this->receiver_name);
        $stmt->bindParam(":receiver_email", $this->receiver_email);
        $stmt->bindParam(":receiver_phone", $this->receiver_phone);
        $stmt->bindParam(":receiver_address", $this->receiver_address);
        $stmt->bindParam(":sending_loc", $this->sending_loc);
        $stmt->bindParam(":delivery_loc", $this->delivery_loc);
        $stmt->bindParam(":service_price", $this->service_price);
        $stmt->bindParam(":delivery_type", $this->delivery_type);
        $stmt->bindParam(":delivery_price", $this->delivery_price);
        $stmt->bindParam(":delivery_status", $this->delivery_status);
        $stmt->bindParam(":comment", $this->comment);

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
        $query = "UPDATE $this->table_name SET 
                tracking_no = :tracking_no,
                description = :description,
                quantity = :quantity,
                sender_name = :sender_name,
                sender_email = :sender_email,
                sender_phone = :sender_phone,
                sender_address = :sender_address,
                receiver_name = :receiver_name,
                receiver_email = :receiver_email,
                receiver_phone = :receiver_phone,
                receiver_address = :receiver_address,
                sending_loc = :sending_loc,
                delivery_loc = :delivery_loc,
                service_price = :service_price,
                delivery_type = :delivery_type,
                delivery_price = :delivery_price,
                delivery_status = :delivery_status,
                comment = :comment,
                updated_at = :updated_at
                 WHERE
                 package_id = :package_id";

        // prepare query statement
        $update_stmt = $this->conn->prepare($query);

        // bind values
        $update_stmt->bindParam(":tracking_no", $this->tracking_no);
        $update_stmt->bindParam(":description", $this->description);
        $update_stmt->bindParam(":quantity", $this->quantity);
        $update_stmt->bindParam(":sender_name", $this->sender_name);
        $update_stmt->bindParam(":sender_email", $this->sender_email);
        $update_stmt->bindParam(":sender_phone", $this->sender_phone);
        $update_stmt->bindParam(":sender_address", $this->sender_address);
        $update_stmt->bindParam(":receiver_name", $this->receiver_name);
        $update_stmt->bindParam(":receiver_email", $this->receiver_email);
        $update_stmt->bindParam(":receiver_phone", $this->receiver_phone);
        $update_stmt->bindParam(":receiver_address", $this->receiver_address);
        $update_stmt->bindParam(":sending_loc", $this->sending_loc);
        $update_stmt->bindParam(":delivery_loc", $this->delivery_loc);
        $update_stmt->bindParam(":service_price", $this->service_price);
        $update_stmt->bindParam(":delivery_type", $this->delivery_type);
        $update_stmt->bindParam(":delivery_price", $this->delivery_price);
        $update_stmt->bindParam(":delivery_status", $this->delivery_status);
        $update_stmt->bindParam(":comment", $this->comment);

        $update_stmt->bindParam(':updated_at', $this->updated_at);

        $update_stmt->bindParam(':package_id', $this->package_id);

        try {
            $update_stmt->execute();
            // stmt return true if suucesful and false if failed
            return ["output" => $update_stmt, "outputStatus" => 1000];
        } catch (Exception $e) {
            return ["output" => $e->getMessage(), "eror" => "Netork issue. Please try again.", "outputStatus" => 1200];
        };
    }

    // delete a user
    function deletePackage()
    {
        // delete query
        $query = "DELETE FROM $this->table_name WHERE package_id = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // bind package_id of record to delete
        $stmt->bindParam(1, $this->package_id);

        try {

            $stmt->execute();
            // stmt return true if suucesful and false if failed
            return ["output" => $stmt, "outputStatus" => 1000];
        } catch (Exception $e) {

            return ["output" => $e->getMessage(), "outputStatus" => 1200];
        }
    }


    // search for a particular package(s) in a given column
    function searchPackage($searchstring, $col)
    {

        // select all query
        // $query = "SELECT * FROM $this->table_name WHERE $col LIKE '%$searchstring%'";

        $query = "SELECT packages.*, pstatus.package_status_id, pstatus.ps_created_at, pstatus.ps_updated_at, plocation.package_loc, plocation.pl_created_at, plocation.pl_updated_at FROM $this->table_name LEFT JOIN pstatus ON packages.package_id=pstatus.package_id LEFT JOIN plocation ON packages.package_id=plocation.package_id WHERE packages.$col LIKE '%$searchstring%'";

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


    // Generates package tracking number
    private function genTrackNo(){

        $this->tracking_no = "TRKNO" . Date("YmdHis") . substr(md5(time()), 0, 12);

        return;
    }


}
