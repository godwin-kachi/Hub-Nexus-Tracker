<?php
include '../config/autoloader.php';

// required headers
header("Access-Control-Allow-Origin: " . $configx["dbconnx"]["ORIGIN"]);
header("Content-Type: " . $configx["dbconnx"]["CONTENT_TYPE"]);
header("Access-Control-Allow-Methods: " . $configx["dbconnx"]["DELETE_METHOD"]);
header("Access-Control-Max-Age: " . $configx["dbconnx"]["MAX_AGE"]);
header("Access-Control-Allow-Headers: " . $configx["dbconnx"]["ALLOWED_HEADERS"]);

// initialize object
$db = new Database($configx);
$conn = $db->getConnection();

$package = new Package($conn);

// Declare package_stmt property
//$updateStatus = null;
//$package_to_delete = null;

// get package_id of user to be edited
$data = json_decode(file_get_contents("php://input"));



// Check for valid package_id
if (empty($data->package_id) || !is_numeric($data->package_id) || intval($data->package_id) <= 0) {
    // set response code - 403 forbidden
    http_response_code(403);
    // tell the user
    echo json_encode(["message" => "Please provide a valid package id", "status" => 2]);
    return;
}

// set package_id property of package to be edited
$package->package_id = cleanData($data->package_id);

// Retrieve the package details
$package_stmt = $package->getPackage();

// Handle package retrieval errors
if ($package_stmt['outputStatus'] == 1000) {
        
    $package_to_delete = $package_stmt['output']->fetch(PDO::FETCH_ASSOC);
        
       
http_response_code(200);
echo json_encode(["message" => $package_to_delete, "status" => 333]);
return;



    // If package does not exist
    if (!$package_to_delete || empty($package_to_delete)) {
        // set response code - 404 not found
        http_response_code(404);
        // tell the package
        echo json_encode(["message" => "No package found with this ID.", "status" => 0]);
        return;
    }


        // update the package
        $deleteStatus = $package->deletePackage();

            
    // Check delete status
    if ($deleteStatus['outputStatus'] == 1000) {
            
        // set response code - 200 ok
        http_response_code(200);
        // tell the package
        echo json_encode(["message" => "Package was deleted successfully.", "status" => 1]);
        return;
            
    } elseif ($deleteStatus['outputStatus'] == 1200) {
            
        errorDiag($deleteStatus['output']);
        return;
            
    } else {
            
        // set response code - 503 service unavailable
        http_response_code(503);
        // tell the package
        echo json_encode(["message" => "Unable to delete package. Please try again.", "status" => 5]);
        return;
            
    }
} elseif ($package_stmt['outputStatus'] == 1200) {
        
    errorDiag($package_stmt['output']);
    return;
        
} else {
        
    // set response code - 503 service unavailable
    http_response_code(503);
    // tell the package
    echo json_encode(["message" => "Unable to delete package. Please try again.", "status" => 6]);
    return;
        
}
