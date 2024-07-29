<?php
include '../config/autoloader.php';

// required headers
header("Access-Control-Allow-Origin:" . $configx["dbconnx"]["ORIGIN"]);
header("Content-Type:" . $configx["dbconnx"]["CONTENT_TYPE"]);
header("Access-Control-Allow-Methods:" . $configx["dbconnx"]['POST_METHOD']);
header("Access-Control-Max-Age:$" . $configx["dbconnx"]['MAX_AGE']);
header("Access-Control-Allow-Headers:" . $configx["dbconnx"]['ALLOWED_HEADERS']);

// initialize object
$db = new Database($configx);
$conn = $db->getConnection();

$package = new Package($conn);

// get package_id of user to be edited
$data = json_decode(file_get_contents("php://input"));
// var_dump($data);
// return;

// ----- user is implemented here -----

    // Initialize user object

// ---- user implementation ends here -----

// Check for valid package_id
if (empty($data->package_id) || $data->package_id == null || $data->package_id == " " || !is_numeric($data->package_id)) {

    // set response code - 503 service unavailable
    http_response_code(403);
    // tell the user
    echo json_encode(["message" => "Please provide a valid assignment id", "status" => 2]);
    return;

}

// Check for valid package_id
if (empty($data->update_mode) || $data->update_mode == null || $data->update_mode == ' ') {

    // set response code - 503 service unavailable
    http_response_code(403);
    // tell the user
    echo json_encode(["message" => "Please provide valid update mode and try again", "status" => 3]);
    return;

}

// set assignment_id property of assignment to be edited
$package->package_id = cleanData($data->package_id);

// Get the package whose details are to be updated 
$package_stmt = $package->getPackage();

$package_to_update = null;

if ($package_stmt['outputStatus'] == 1000) {

    $package_to_update = $package_stmt['output']->fetch(PDO::FETCH_ASSOC);

    // var_dump($package_to_update);
    // return;

    // If package does not exist
    if (!$package_to_update || $package_to_update == null || count($package_to_update) == 0) {
        // set response code - 200 ok
        http_response_code(404);

        // tell the package
        echo json_encode(["message" => "No package found with this ID.", "status" => 0]);

        return;
    }

 

    // Declare package_stmt property
    $updateStatus = null;

    if ($data->update_mode == "update_package") {

        // Else set properties
        $package->tracking_no = empty($data->tracking_no) ? $package_to_update['tracking_no'] : cleanData($data->tracking_no);
        $package->description = empty($data->description) ? $package_to_update['description'] :  cleanData($data->description);
        $package->quantity = empty($data->quantity) ? $package_to_update['quantity'] :  cleanData($data->quantity);

        $package->sender_name = empty($data->sender_name) ? $package_to_update['sender_name'] :  cleanData($data->sender_name);
        $package->sender_email = empty($data->sender_email) ? $package_to_update['sender_email'] :  cleanData($data->sender_email);
        $package->sender_phone = empty($data->sender_phone) ? $package_to_update['sender_phone'] :  cleanData($data->sender_phone);
        $package->sender_address = empty($data->sender_address) ? $package_to_update['sender_address'] :  cleanData($data->sender_address);

        $package->receiver_name = empty($data->receiver_name) ? $package_to_update['receiver_name'] :  cleanData($data->receiver_name);
        $package->receiver_email = empty($data->receiver_email) ? $package_to_update['receiver_email'] :  cleanData($data->receiver_email);
        $package->receiver_phone = empty($data->receiver_phone) ? $package_to_update['receiver_phone'] :  cleanData($data->receiver_phone);
        $package->receiver_address = empty($data->receiver_address) ? $package_to_update['receiver_address'] :  cleanData($data->receiver_address);

        $package->sending_loc = empty($data->sending_loc) ? $package_to_update['sending_loc'] :  cleanData($data->sending_loc);
        $package->delivery_loc = empty($data->delivery_loc) ? $packageto_update['delivery_loc'] :  cleanData($data->delivery_loc);
        $package->service_price = empty($data->service_price) ? $package_to_update['service_price'] :  cleanData($data->service_price);
        $package->delivery_type = empty($data->delivery_type) ? $package_to_update['delivery_type'] :  cleanData($data->delivery_type);
        $package->delivery_price = empty($data->delivery_price) ? $package_to_update['delivery_price'] :  cleanData($data->delivery_price);
        $package->delivery_status = empty($data->delivery_status) ? $package_to_update['delivery_status'] :  cleanData($data->delivery_status);
        $package->comment = empty($data->comment) ? $package_to_update['comment'] :  cleanData($data->comment);

        // update the package
        $updateStatus = $package->updatePackage();
        
    }
    elseif ($data->update_mode == "update_location") {

        $package->package_loc = empty($data->package_loc) ? $package_to_update['package_loc'] :  cleanData($data->package_loc);

        // update the package
        $updateStatus = $package->updatePackageLocation();

    }
    elseif ($data->update_mode == "update_status") {

        $package->package_status_id = empty($data->package_status_id) ? $package_to_update['package_status_id'] :  cleanData($data->package_status_id);

        // update the package
        $updateStatus = $package->updatePackageStatus();
        
    }
    else {

        // set response code - 200 ok
        http_response_code(200);
        // tell the package
        echo json_encode(["message" => "package update FAIL. Please try again.", "status" => 4]);
        return;

    }

    

    if ($updateStatus['outputStatus'] == 1000) {

        // set response code - 200 ok
        http_response_code(200);
        // tell the package
        echo json_encode(["message" => "package was updated successfully.", "status" => 1]);
        return;

    } 
    elseif ($updateStatus['outputStatus'] = 1200) {

        errorDiag($updateStatus['output']);
        return;

    }
    else {

        // set response code - 503 service unavailable
        http_response_code(503);
        // tell the package
        echo json_encode(["message" => "Unable to update package. Please try again.", "status" => 5]);
        return;

    }
} elseif ($package_stmt['outputStatus'] = 1200) {

    errorDiag($package_stmt['output']);
    return;
}
else {

    // set response code - 503 service unavailable
    http_response_code(503);
    // tell the package
    echo json_encode(["message" => "Unable to update package. Please try again.", "status" => 6]);
    return;
}
