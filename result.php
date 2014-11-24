<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Light Tag Handler Demo - Soyo Solution</title>
</head>

<body>
<?php
if (isset($_POST['demo_1'])) {
    echo 'demo_1:' . htmlspecialchars($_POST["demo_1"]).'<br />';
}
if (isset($_POST['demo_2'])) {
    echo 'demo_2:' . htmlspecialchars($_POST["demo_2"]).'<br />';
}
if (isset($_POST['demo_3'])) {
    echo 'demo_3:' . htmlspecialchars($_POST["demo_3"]).'<br />';
}
?>
</body>
</html>
