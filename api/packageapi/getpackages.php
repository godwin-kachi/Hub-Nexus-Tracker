<?php
include '../config/autoloader.php';

// required headers
header("Access-Control-Allow-Origin:" . $configx["dbconnx"]["ORIGIN"]);
header("Content-Type:" . $configx["dbconnx"]["CONTENT_TYPE"]);
header("Access-Control-Allow-Methods:" . $configx["dbconnx"]['GET_METHOD']);
header("Access-Control-Max-Age:$" . $configx["dbconnx"]['MAX_AGE']);
header("Access-Control-Allow-Headers:" . $configx["dbconnx"]['ALLOWED_HEADERS']);

// initialize object
$db = new Database($configx);
$conn = $db->getConnection();

$package = new Package($conn);

$stmt = $package->getAllPackages();

var_dump($stmt);
return;
// check if more than 0 record found
if ($stmt["outputStatus"] == 1000) {
     
    $result = $stmt["output"]->fetchAll(PDO::FETCH_ASSOC);

    // var_dump($result);
// return;
    
    if (count($result) == 0 || !$result) {
        // set response code - 200 OK
        http_response_code(404);

        // show assignments data in json format
        echo json_encode(array("message" => "No assignment found.", "status"=>1));

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