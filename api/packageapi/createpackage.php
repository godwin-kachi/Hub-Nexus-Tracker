<?php
include '../config/autoloader.php';

// required headers
header("Access-Control-Allow-Origin:" . $configx["dbconnx"]["ORIGIN"]);
header("Content-Type:" . $configx["dbconnx"]["CONTENT_TYPE"]);
header("Access-Control-Allow-Methods:" . $configx["dbconnx"]['POST_METHOD']);
header("Access-Control-Max-Age:" . $configx["dbconnx"]['MAX_AGE']);
header("Access-Control-Allow-Headers:" . $configx["dbconnx"]['ALLOWED_HEADERS']);


// initialize object
$db = new Database($configx);
$conn = $db->getConnection();

// User gate will be implemented here




// User gate ends here

$package = new Package($conn);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// var_dump($data);
// return;

// make sure data is not empty
if (
    !empty($data->description) || !empty($data->quantity) || !empty($data->sender_name) || !empty($data->sender_phone) || !empty($data->sender_address) || !empty($data->receiver_name) || !empty($data->receiver_phone) || !empty($data->receiver_address) || !empty($data->sending_loc) || !empty($data->delivery_loc) || !empty($data->shipping_cost) || !empty($data->delivery_type)
) {

    // Sanitize & set package property values
    $package->description = cleanData($data->description);
    $package->quantity = cleanData($data->quantity);
    $package->sender_name = cleanData($data->sender_name);
    $package->sender_email = cleanData($data->sender_email) ?? null;
    $package->sender_phone = cleanData($data->sender_phone);
    $package->sender_address = cleanData($data->sender_address);
    $package->receiver_name = cleanData($data->receiver_name);
    $package->receiver_email = cleanData($data->receiver_email) ?? null;
    $package->receiver_phone = cleanData($data->receiver_phone);
    $package->receiver_address = cleanData($data->receiver_address);
    $package->sending_loc = cleanData($data->sending_loc);
    $package->delivery_loc = cleanData($data->delivery_loc);
    $package->service_price = cleanData($data->service_price);
    $package->delivery_type = cleanData($data->delivery_type);
    $package->delivery_price = cleanData($data->delivery_price) ?? 0;
    $package->comment = cleanData($data->comment);

 

    // create the assignment
    $newpackage = $package->createPackage();

    // var_dump($newpackage);
    // return;

    if ($newpackage['outputStatus'] == 1000) {

        // set response code - 201 created
        http_response_code(201);

        // tell the package
        // echo json_encode(array("message" => "package was created. Please check your email for your verification link","mailSent"=>$mailSent));
        echo json_encode(["message" => "package was created successfully", "status" => 1]);
        return;
    }
    elseif ($newpackage['outputStatus'] == 1200) {

        errorDiag($newpackage['output']);
        return;
    }
    else {
        // set response code - 200 ok
        http_response_code(400);

        // tell the package
        echo json_encode(["message" => $newpackage['output'], "status" => 0]);
        return;
    }
    
} else {

    // tell the package data is incomplete

    // set response code - 400 bad request
    http_response_code(400);

    // tell the package
    echo json_encode(["message" => "Unable to create package. Fill all fields.", "status" => 2]);
    return;

}


