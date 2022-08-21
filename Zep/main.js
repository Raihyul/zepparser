
const companyImg = {
    floor: {
      pos: { x: 17, y: 11 },
      dir: "zep.png",
    },
    wallLeft: {
      pos: { x: 6, y: 1 },
      dir: "Company_Introduction_220714-27.png",
    },
    wallRight: {
      pos: { x: 34, y: 1 },
      dir: "Company_Introduction_220714-28.png",
    },
    youtube: {
        pos: {x: 20, y: 1},
        dir: "thumbnail.png"
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
      for (let y in [11, 13, 15]) {
        customWebProtalEffect(
          8,
          y,
          TileEffectType.WEB_PORTAL,
          "https://docs.google.com/forms/d/e/1FAIpQLSctsTGYwL9xu-uFg55jSuVPCTwK-3zZTU_70ZAwHPbu8dIINg/viewform"
        );
      }
  
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
        "https://youtu.be/MMnn78lBs9Y"
      );
      // 회사 홈페이지 (새 창, 상호작용 필수)
      customWebProtalEffect(39, 8, TileEffectType.WEB_PORTAL, "https://zep.us");
    }
    customMessageBubble(32, 19, "helloBot", bubble1);
    customMessageBubble(3, 6, "npc", bubble2);
    customMessageBubble(3, 13, "managerContact", managerContact);
  });
