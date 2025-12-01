const userRole = "moderator"

switch (userRole) {
    case "admin":
        console.log("Полные права доступа");
        // break ;
    case"moderator":
        console.log("Может банить подбзователей");
//  break ;
    case"user":
    console.log("Просмотр информации");
    // break;
    default:
        console.log("Неизвестная роль");
}