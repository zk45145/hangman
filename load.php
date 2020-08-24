<?php

header('Content-type: application/json');

$db=mysqli_connect("localhost","root","","wisielec");

if (mysqli_connect_errno())

{echo "Wystąpił błąd połączenia z bazą";}

if (!mysqli_set_charset($db, "utf8")) {
    printf("Error loading character set utf8: %s\n", mysqli_error($db));
} else {
    mysqli_character_set_name($db);
}

$sentences = mysqli_query($db,"SELECT * FROM hasla");
$i = 0;
while($row = mysqli_fetch_array($sentences)){
    $haslo[$i][0] = $row['haslo'];
    $haslo[$i][1] = $row['id_kategorii'];
    $i++;
}

$categories = mysqli_query($db,"SELECT * FROM kategorie");
$i = 0;
while($row = mysqli_fetch_array($sentences)){
    $kategoria[0][$i] = $row['id_kategorii'];
    $kategoria[1][$i] = $row['nazwa_kategorii'];
    $i++;
}

echo json_encode($haslo);
mysqli_close($db);