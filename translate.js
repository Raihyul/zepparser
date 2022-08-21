var fs = require('fs');
const { getFileContents } = require('./utils/fileManager');
const AdmZip = require('adm-zip');
const sharp = require('sharp');

function getJson(content, targetDir) {
    let companyTitle = getCompanyName(content);
    let companyContent = getCompanyContent(content);
    let companyYoutubeLink = getYoutubeLink(companyContent);
    let companyDescription = getDescription(companyContent);
    let companyImg = getCompanyImg(companyContent);
    let ImgDir = getImgDir(companyContent);

    let productContent = getProductContent(content);
    let productPromotionVideo = getYoutubeLink(productContent);
    let productDescription = getDescription(productContent);
    let productImg = getProductIgmg(productContent);


    let isRecruitment = content.includes('## Recruitment');
    let recruitmentJds = [];
    let recruitmentContact = "";
    if (isRecruitment) {
        recruimentContent = getRecruitmentContent(content);
        recruitmentJds = getRecruitmentJds(recruimentContent);
        recruitmentContact = getRecruitmentContact(recruimentContent);
    }
    let youtubeThumbnailLink = getYoutubeThumbnail(companyYoutubeLink);
    let defaultDir = targetDir + '/' + ImgDir.replace("%20", "\ ");
    downloadImgFile(youtubeThumbnailLink, defaultDir + '/thumbnail.png');

    let logoPath = getCompanyLogo(content);

    const json_result = {
        "companyName": companyTitle,
        "companyYoutubeLink": companyYoutubeLink,
        "companyDescription": companyDescription,
        "product": {
            "promotionVideo": productPromotionVideo,
            "description": productDescription,
            "images": productImg
        },
        "recruitment": {
            "jds": recruitmentJds,
            "isRecruimentOngoing": isRecruitment,
            "managerContact": recruitmentContact
        },
        "images": companyImg,
        "logoPath": logoPath,
        "youtubeThumbnailPath": 'thumbnail.png',
        "prevImgDir": ImgDir,
    }
    console.log(JSON.stringify(json_result))
    return JSON.stringify(json_result);
}

function getCompanyName(content) {
    const regex = /(?<=^# )[a-zA-Z]+/gm;
    let match = regex.exec(content);
    return match[0];
}

function getImgDir(content) {
    console.log(content);
    const regex = /!\[(.*?)\]\((.*?)\)/gms;

    let result;
    let m;

    while ((m = regex.exec(content)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if (groupIndex == 2) {
                result = match.split('/')[0];
            }
        });
    }
    return result;

}


function getCompanyLogo(content) {
    const regex = /!\[(.*?)\]\((.*?)\)/gms;

    let result;
    let m;

    while ((m = regex.exec(content)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if (groupIndex == 2) {
                result = match.split('/')[0];
            }
        });
    }
    return result;
}

function getYoutubeLink(content) {
    const regex = /(https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9]+)/gm;
    let match = regex.exec(content);
    return match[0];
}

function getCompanyContent(content) {
    const regex = /(?<=^# )(.*?)(?=## )/gms;
    let match = regex.exec(content);
    return match[0];
}

function getDescription(content) {
    const regex = /\[(https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9]+)]\((https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9]+)\)/gms;
    const subst = ``;
    let result = content.replace(regex, subst);
    result = result.replace('### ', '');
    const regex2 = /!\[(.*?)\]\((.*?)\)/gms;
    const subst2 = ``;
    result = result.replace(regex2, subst2);
    result = result.replace("### Product Image", "");
    return result;
}

function getProductContent(content) {
    const regex = /(?<=^## Product)(.*?)(?=## Recruitment)/gms;
    let match = regex.exec(content);
    return match[0];
}


function getProductIgmg(content) {
    const regex = /!\[(.*?)\]\((.*?)\)/gms;

    let result = []
    let m;

    while ((m = regex.exec(content)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if (groupIndex == 2) {
                result.push(match.split('/')[1]);
            }
        });
    }
    return result;
}


function getIsRecruitment(content) {
    const regex = /(?<=^## Product)(.*?)(?=## Recruitment)/gms;
    let match = regex.exec(content);
    return match != null;
}

function getRecruitmentJds(content) {
    const regex = /(?<=\| Title \| Link \|\n\| --- \| --- \|\n).*$/gms;
    let match = regex.exec(content);
    content = match[0];
    let parse_result = content.split('\n').map(line => {
        line = line.trim();
        if (!line) return '';
        if (!line.startsWith('|')) line = `|${line}`;
        if (!line.endsWith('|')) line = `${line}|`;

        return line.split('|').slice(1, -1);
    });
    let result = parse_result.map(line => {
        return {
            "title": line[0].trim(),
            "link": line[1].trim()
        }
    })
    return result;
}

function getRecruitmentContent(content) {
    const regex = /(?<=## Recruitment).*$/gms;
    let match = regex.exec(content);
    return match[0];
}

function getRecruitmentContact(content) {
    const regex = /(?<=Contact : ).*$/gm;
    let match = regex.exec(content);
    return match[0];
}

function getCompanyImg(content) {
    const regex = /!\[(.*?)\]\((.*?)\)/gms;

    let result = []
    let m;

    while ((m = regex.exec(content)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if (groupIndex == 2) {
                result.push(match.split('/')[1]);
            }
        });
    }
    return result;

}


function getCompanyLogo(content) {
    const regex = /(?<=## BI\/CI)(.*?)!\[(.*?)\]\((.*?)\)/gms;

    let result;
    let m;

    while ((m = regex.exec(content)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            if (groupIndex == 2) {
                result = match;
            }
        });
    }
    return result;
}


function getYoutubeThumbnail(link) {
    const regex = /(?<=v=)[a-zA-Z0-9]+/gm;
    let match = regex.exec(link);
    return `https://img.youtube.com/vi/${match[0]}/0.jpg`;
}
function downloadImgFile(link, fileName) {

    var exec = require('child_process').exec,
        child;
    fileName = fileName.replace(" ", "\\ ");
    const call = `curl --location --request GET '${link}' --header 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36' > ${fileName}`;

    child = exec(call, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}

const targetDir = './result'
const fileName = process.argv[2];
const companyName = process.argv[3];
const fileContents = getFileContents(fileName, targetDir);
k = JSON.parse(getJson(fileContents, targetDir));
console.log(k);

const mainJSscript = `
const companyImg = {
    floor: {
      pos: { x: 17, y: 11 },
      dir: ${JSON.stringify(k["logoPath"])},
    },
    wallLeft: {
      pos: { x: 6, y: 1 },
      dir: ${JSON.stringify(k["images"][0])},
    },
    wallRight: {
      pos: { x: 34, y: 1 },
      dir: ${JSON.stringify(k["images"][1])},
    },
    youtube: {
        pos: {x: 20, y: 1},
        dir: ${JSON.stringify(k["youtubeThumbnailPath"])}
    }
  };

  function generateImgObj(loc) {
    return App.loadSpritesheet(companyImg[loc].dir);
  }
  
  function attachImgObjToMap(loc) {
    Map.putObject(
      companyImg[loc].pos.x,
      companyImg[loc].pos.y,
      generateImgObj(loc),
      {
        overlap: true,
      }
    );
  }
  
  function customPopupEffect(x, y, effectType, link) {
    Map.putTileEffect(x, y, effectType, {
      link: link,
      align2: "popup",
      triggerByTouch: true,
    });
  }
  
  function customWebProtalEffect(x, y, effectType, link) {
    Map.putTileEffect(x, y, effectType, {
      link: link,
      invisible: true,
    });
  }
  
  function loadImg(src) {
    return App.loadSpritesheet(src);
  }
  
  function attachImg(x, y, loadedImg) {
    Map.putObject(x, y, loadedImg, { overlap: true });
  }
  
  function removeImg(x, y) {
    Map.putObject(x, y, null, { overlap: true });
  }
  
  function customMessageBubble(x, y, region, message) {
    App.addOnLocationTouched(region, function (player) {
      attachImg(x, y, message);
      setTimeout(function () {
        return removeImg(x, y);
      }, 5000);
    });
  }


  const bubble1 = loadImg("bubble_hello.png");
const bubble2 = loadImg("bubble_npc.png");
const managerContact = loadImg("managerContact.png");
// 최초의 사용자가 입장했을 때만 실행되도록
let tileEffectOn = false;

App.onJoinPlayer.Add(function (player) {
    // 해당하는 모든 플레이어가 이 이벤트를 통해 App에 입장
  
    // 기업 이미지들 맵에 부착
    attachImgObjToMap("floor");
    attachImgObjToMap("wallLeft");
    attachImgObjToMap("wallRight");
    attachImgObjToMap("youtube");
  
    if (!tileEffectOn) {
      tileEffectOn = true;
      customWebProtalEffect(8, 11, TileEffectType.WEB_PORTAL,
        "https://docs.google.com/forms/d/e/1FAIpQLSctsTGYwL9xu-uFg55jSuVPCTwK-3zZTU_70ZAwHPbu8dIINg/viewform"
    );
    customWebProtalEffect(8, 13, TileEffectType.WEB_PORTAL,
        "https://docs.google.com/forms/d/e/1FAIpQLSctsTGYwL9xu-uFg55jSuVPCTwK-3zZTU_70ZAwHPbu8dIINg/viewform"
    );
    customWebProtalEffect(8, 15, TileEffectType.WEB_PORTAL,
        "https://docs.google.com/forms/d/e/1FAIpQLSctsTGYwL9xu-uFg55jSuVPCTwK-3zZTU_70ZAwHPbu8dIINg/viewform"
    );
  
      customPopupEffect(
        11,
        8,
        TileEffectType.EMBED,
        "https://careers.supercat.co.kr/home"
      );
      // 회사 유튜브 영상 (pop up)
      customPopupEffect(
        25,
        8,
        TileEffectType.EMBED,
        ${JSON.stringify(k["product"]["promotionVideo"])},
      );
      // 회사 홈페이지 (새 창, 상호작용 필수)
      customWebProtalEffect(39, 8, TileEffectType.WEB_PORTAL, "https://zep.us");
    }
    customMessageBubble(32, 19, "helloBot", bubble1);
    customMessageBubble(3, 6, "npc", bubble2);
    customMessageBubble(3, 13, "managerContact", managerContact);
  });
`



const dir = `./${companyName}`;
!fs.existsSync(dir) && fs.mkdirSync(dir);


fs.writeFile(dir + "/main.js", mainJSscript, function (err) {
    if (err) throw err;
    console.log("Saved!");
});

const img_path = './result/' + k["prevImgDir"].replace("%20", "\\ ");
console.log(img_path)


var exec = require('child_process').exec,
    child;
const call = `mv ${img_path}/* ${dir}`;

child = exec(call, function (error, stdout, stderr) {
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});

setTimeout(function () {
    const fileList = fs.readdirSync(dir);
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        if (file.includes('.png') || file.includes('.jpg')) {
            var exec = require('child_process').exec,
                child;
            const call2 = `python resize.py -f ${companyName + "/" + file}`;
            console.log(call2)
            child = exec(call2, function (error, stdout, stderr) {
                console.log(stdout);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        }
    }

}, 5000);

setTimeout(function () {
    var exec = require('child_process').exec,
        child;
    const call3 = `cp bubble_hello.png bubble_npc.png managerContact.png ./${companyName}`;

    child = exec(call3, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}, 10000);



setTimeout(function () {
    var exec = require('child_process').exec,
        child;
    const call3 = `cd ${companyName}; zip ${companyName}.zip *.png *.jpg main.js`;

    child = exec(call3, function (error, stdout, stderr) {
        console.log(stdout);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}, 15000);
