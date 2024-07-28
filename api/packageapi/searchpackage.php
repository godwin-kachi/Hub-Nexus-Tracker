<?php
include '../config/autoloader.php';

// required headers
header("Access-Control-Allow-Origin:" . $configx["dbconnx"]["ORIGIN"]);
header("Content-Type:" . $configx["dbconnx"]["CONTENT_TYPE"]);
header("Accept:" . $configx["dbconnx"]["ACCEPT_TYPE"]);
header("Access-Control-Allow-Methods:" . $configx["dbconnx"]['POST_METHOD']);
header("Access-Control-Max-Age:$" . $configx["dbconnx"]['MAX_AGE']);
header("Access-Control-Allow-Headers:" . $configx["dbconnx"]['ALLOWED_HEADERS']);

// initialize object
$db = new Database($configx);
$conn = $db->getConnection();

// User gate will be implemented here




// User gate ends here

$package = new Package($conn);

// get admin_no of user to be edited
$data = json_decode(file_get_contents("php://input"));

// Check for valid admin_no
if (empty($data->searchstring) || $data->searchstring == null || $data->searchstring == ' ') {
    // set response code - 503 service unavailable
    http_response_code(403);

    // tell the user
    echo json_encode(["message" => "Please provide what you are searching for", "status" => 2]);

    return;
}

// Check for valid new password
if (empty($data->searchcolumn) || $data->searchcolumn == null || $data->searchcolumn == ' ') {
    // set response code - 503 service unavailable
    http_response_code(403);

    // tell the user
    echo json_encode(["message" => "Please provide a valid table column name to search in", "status" => 3]);

    return;
}

$searchString = cleanData($data->searchstring);
$searchColumn = cleanData($data->searchcolumn);

// Get the package whose details are to be updated 
$search_stmt = $package->searchPackage($searchString, $searchColumn);

// var_dump($search_stmt);
// return;

if ($search_stmt['outputStatus'] == 1000) {

    $search_result = $search_stmt['output']->fetchAll(PDO::FETCH_ASSOC);

    if (count($search_result) == 0) {
        // set response code -
        http_response_code(404);

        // tell the package
        echo json_encode(["message" => "No package found for this search word : $searchString", "status" => 0]);
        return;
    }

    // set response code - 200 ok
    http_response_code(200);

    // tell the package
    echo json_encode(["message" => "Success","result"=>$search_result, "status" => 1]);
    return;
} elseif ($search_stmt['outputStatus'] == 1200) {
    errorDiag($search_stmt['output']);
    return;
    
} else {

    // set response code - 503 service unavailable
    http_response_code(503);

    // tell the package
    echo json_encode(["message" => "No package found for this search item", "status" => 200]);
}
