
document.addEventListener('DOMContentLoaded', function() {
    // Get user ID and level from localStorage
    const userId = localStorage.getItem('userID');
    const user_sps = localStorage.getItem('sps_local');
    const userLevel = localStorage.getItem('level_local');

    
    // Redirect if user ID or level is missing
    if (!userId || !userLevel) {
        window.location.href = 'login.html';
        return;
    }
    

    
    // Get button elements
    const level1Btn = document.getElementById('level1Btn');
    const level2Btn = document.getElementById('level2Btn');
    const level3Btn = document.getElementById('level3Btn');
    
    // Configure button access based on user level
    if (userLevel === '1') {
        level1Btn.disabled = false;
        level2Btn.disabled = true;
        level3Btn.disabled = true;
    } else if (userLevel === '2') {
        level1Btn.disabled = false;
        level2Btn.disabled = false;
        level3Btn.disabled = true;
    } else if (userLevel === '3') {
        level1Btn.disabled = false;
        level2Btn.disabled = false;
        level3Btn.disabled = false;
    }
    else if(userLevel==0){
        level1Btn.disabled = true;
        level2Btn.disabled = true;
        level3Btn.disabled = true;
    }
    
    // Set up button click events
    level1Btn.addEventListener('click', function() {
        if(user_sps=="AI"){window.location.href ="level1.html"}
        else if (user_sps=="Web"){window.location.href ="https://drive.google.com/drive/folders/1OcWD_u7fHImTvuDLDD-c6u656pfxhlxX?usp=drive_link"}
        else if (user_sps=="cy"){window.location.href ="https://drive.google.com/drive/folders/10zPo-9YSBC8ZZHk-WBJk2Y1yuLCxYp2i?usp=drive_link"}
    });
    
    level2Btn.addEventListener('click', function() {
        if(user_sps=="AI"){window.location.href ="https://drive.google.com/drive/folders/1a7gcUjn1CkQgj0s6VTyfQ5g2RYNTMcgX?usp=sharing"}
        else if (user_sps=="Web"){window.location.href ="https://drive.google.com/drive/folders/1De9MCpKgvkdUOSQmZExvNM9cLtFBwLHo?usp=drive_link"}
        else if (user_sps=="cy"){window.location.href ="https://drive.google.com/drive/folders/1hfs72CHGTVkQ2ttn8rXQg8AclgsYxhSp?usp=drive_link"}
    });
    
    level3Btn.addEventListener('click', function() {
        if(user_sps=="AI"){window.location.href ="https://drive.google.com/drive/folders/10xSoa5LT0XrjM_0NCe_kqIkL8Z6uyshh?usp=sharing"}
        else if (user_sps=="Web"){window.location.href ="https://drive.google.com/drive/folders/1rd8lIWr4tzwMihWM8-aGvy-DedQMB5M-?usp=drive_link"}
        else if (user_sps=="cy"){window.location.href ="https://drive.google.com/drive/folders/11v6m2_-coh0G9MTXIORruo-f7R956Ama?usp=drive_link"}
    });
    
    document.getElementById('programsBtn').addEventListener('click', function() {
        if(user_sps=="AI"){window.location.href ="https://drive.google.com/drive/folders/1CnKdwkQf579_oP28wp-MUA-CIC0PzdiB?usp=sharing"}
        else if (user_sps=="Web"){window.location.href ="https://drive.google.com/drive/folders/18JeEaPdNh0L4WusgOQLIdAncThozPDU6?usp=sharing"}
        else if (user_sps=="cy"){window.location.href ="https://drive.google.com/drive/folders/1sgcJWZe7VMRSKuYh-PKRyl9RG-8m2BWd?usp=sharing"}
    });
    
    document.getElementById('examsBtn').addEventListener('click', function() {
        if(user_sps=="AI"){window.location.href ="https://drive.google.com/drive/folders/1ifEV7ltA74XSbn7JN6mIOS7AHaJmTo5-?usp=sharing"}
        else if (user_sps=="Web"){window.location.href ="https://drive.google.com/drive/folders/1I3Logh6v56lg4LJhN2jJBGrXEWr0GSqO?usp=sharing"}
        else if (user_sps=="cy"){window.location.href ="https://drive.google.com/drive/folders/1kYk4tQTcH0Ui0Tsyjd61Qj5mDejqoGB2?usp=sharing"}
    });
    // Set up logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
    if (userId){
        localStorage.removeItem('userID');
        localStorage.removeItem('userLevel');
        window.location.href = 'index.html';}
        else{window.location.href = 'index.html';}
    });
});
