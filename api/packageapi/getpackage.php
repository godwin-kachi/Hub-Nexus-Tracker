<?php
include '../config/autoloader.php';

// required headers
header("Access-Control-Allow-Origin:" . $configx["dbconnx"]["ORIGIN"]);
header("Content-Type:" . $configx["dbconnx"]["CONTENT_TYPE"]);
header("Access-Control-Allow-Methods:" . $configx["dbconnx"]['GET_METHOD']);
header("Access-Control-Max-Age:" . $configx["dbconnx"]['MAX_AGE']);
header("Access-Control-Allow-Headers:" . $configx["dbconnx"]['ALLOWED_HEADERS']);

// initialize object
$db = new Database($configx);
$conn = $db->getConnection();

$package = new Package($conn);

// read package id will be here
$package_id = null;

if (!empty($_GET['package_id'])) {
    $package_id = $_GET['package_id'];
} else {


    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->package_id)) {
        $package_id = $data->package_id;
    }
}


if ((empty($package_id) || $package_id == null || !is_numeric($package_id) || $package_id == '' || $package_id == ' ')) {
    // No valid package id provided

    // set response code - 404 Not found
    http_response_code(404);

    // tell the package no products found
    echo json_encode(["message" => "Plaese provide a valid package ID"]);

    return;
}

// query packages
$package->package_id = $package_id;

$stmt = $package->getPackage();

// var_dump($stmt);
// return;

// check if more than 0 record found
if ($stmt["outputStatus"] == 1000) {
     
    $result = $stmt["output"]->fetch(PDO::FETCH_ASSOC);
    
    if (!$result) {
        // set response code - 200 OK
        http_response_code(404);

        // show subjects data in json format
        echo json_encode(["message" => "No subject found with this ID:$package_id", "status"=>0]);

        return;
    }

  
    // set response code - 200 OK
    http_response_code(200);

    // show subjects data in json format
    echo json_encode(["result"=>$result, "status"=>1]);
    return;
} 
elseif ($stmt['outputStatus'] == 1200) {
    // no subjects found will be here
    errorDiag($stmt['output']);
    return;
}
else{
    // no subjects found will be here

    // set response code - 404 Not found
    http_response_code(404);

    // tell the subject no products found
    echo json_encode(
        ["message" => "Something went wrong. Not able to fetch subject."]
    );
}