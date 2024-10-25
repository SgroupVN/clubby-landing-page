class TeamMember {
  constructor(name, avatar, position) {
    this.name = name;
    this.avatar = avatar;
    this.position = position;
  }
}

const $USER = document.getElementById("user");
const $TEAM_HEADER_SLIDE = document.getElementById("slider-header");
const $TEAM_SLIDER = document.getElementById("slider");
const $FEATURE_SLIDER = document.getElementById("feature-slider-header");
const $TEAM_HEADER_SLIDE_CHILD = () =>
  document.querySelectorAll(".slider-header-child");

const OFFSET_USER_SECTION = $USER.offsetTop;
const STATIC_AVATAR_URL = "./public/images/avatar/";
const ACTIVE_SLIDE_CHILD = "slider-header-child-active";
const TIMEOUT_SLIDE_AUTO_TRANSFORM = 6000;
const POSITIONS = {
  FE: {
    key: "Front-end",
    values: [
      new TeamMember(
        "Võ Chính",
        `${STATIC_AVATAR_URL}vochinh.jpeg`,
        "Frontend"
      ),
      new TeamMember(
        "La Hoàng Long",
        `${STATIC_AVATAR_URL}Long.jpg`,
        "Frontend"
      ),
      new TeamMember(
        "Lê Phan Tấn",
        `${STATIC_AVATAR_URL}Tấn.jpg`,
        "Frontend"
      ),
      new TeamMember(
        "Nguyễn Phượng",
        `${STATIC_AVATAR_URL}Phượng.JPG`,
        "Frontend"
      ),
    ],
  },
  BE: {
    key: "Back-end",
    values: [
      new TeamMember(
        "Hồ Văn Vy",
        `${STATIC_AVATAR_URL}HoVanVy.jpg`,
        "Backend"
      ),
      new TeamMember(
        "Nguyễn Quang Tú",
        `${STATIC_AVATAR_URL}NguyenQuangTu.jpg`,
        "Backend"
      ),
      new TeamMember(
        "Đặng Ngọc Phú",
        `${STATIC_AVATAR_URL}DangPhu.jpg`,
        "Backend"
      ),
      new TeamMember(
        "Lê Vũ Tuấn Kha",
        `${STATIC_AVATAR_URL}Kha.jpg`,
        "Backend"
      ),
    ],
  },
  MANAGEMENT: {
    key: "Quản lý dự án",
    values: [
      new TeamMember(
        "Nguyễn Thị Tuyết Trinh",
        `${STATIC_AVATAR_URL}Trinh.jpg`,
        "Quản lý dự án"
      ),
      new TeamMember(
        "Nguyễn Thị Út Quyền",
        `${STATIC_AVATAR_URL}Quyền.jpg`,
        "Quản lý dự án"
      ),
    ],
  },
  DESIGN: {
    key: "Thiết kế",
    values: [
      new TeamMember(
        "Nguyễn Thị Út Quyền",
        `${STATIC_AVATAR_URL}Quyền.jpg`,
        "UI/UX"
      ),
      new TeamMember(
        "Đoàn Thanh Nhật",
        `${STATIC_AVATAR_URL}Đoàn-Thanh-Nhật.jpg`,
        "UI/UX"
      ),
    ],
  },
  MARKETING: {
    key: "Marketing Online",
    values: [
      new TeamMember(
        "Lê Tiến Dũng",
        `${STATIC_AVATAR_URL}Dũng.jpg`,
        "Marketing Online"
      ),
      new TeamMember(
        "Nguyễn Thị Thùy Trang",
        `${STATIC_AVATAR_URL}Trang.jpg`,
        "Marketing online"
      ),
      new TeamMember(
        "Dương Nguyễn Thúy Nga",
        `${STATIC_AVATAR_URL}Nga.JPG`,
        "Marketing online"
      ),
    ],
  },
};
const POSITION_KEYS = Object.keys(POSITIONS);

function renderTeamPositions() {
  Object.keys(POSITIONS).forEach((key) => {
    const node = document.createElement("div");
    node.className = "col-md col-sm-2 slider-header-child";
    node.setAttribute("attr-key", key);
    node.id = key;
    const keyPosition = POSITIONS[key].key;
    const content = document.createTextNode(keyPosition);
    node.appendChild(content);

    if (key === "MANAGEMENT") node.classList.add(ACTIVE_SLIDE_CHILD);

    node.addEventListener("click", function (event) {
      clearActiveOnSliderHeaderChild();
      // Add color when being active
      this.classList.add(ACTIVE_SLIDE_CHILD);

      const sliderDOM = document.getElementById("slider");
      if (sliderDOM.hasChildNodes()) {
        sliderDOM.innerHTML = "";
      }

      const sliderItems = fetchSliderItemValues(this);
      bindingItemsToSlider(sliderItems);
    });
    $TEAM_HEADER_SLIDE.appendChild(node);
  });
  const sliderItems = POSITIONS["MANAGEMENT"].values;
  bindingItemsToSlider(sliderItems);
}

/**
 *
 * @param {any} node
 * @returns {[]} values of members get by node
 */
function fetchSliderItemValues(node) {
  const key = node.getAttribute("attr-key");
  return POSITIONS[key].values;
}

function bindingItemsToSlider(items) {
  items.forEach((item) => {
    const template = `
            <div class="row justify-content-center">
              <div class="slider-item-avatar">
                  <img class="slider-item-avatar-src" src="${item.avatar}" alt="">
              </div>
            </div>

            <div class="row justify-content-center">
              <img src="./public/images/dot-line.min.svg" alt=""></img>
            </div>

            <div class="row justify-content-center slider-item-name">
              <b>${item.name}</b>
            </div>

            <div class="row justify-content-center slider-item-position">
              ${item.position}
            </div>
    `;
    const wrapperNode = document.createElement("div");

    wrapperNode.classList = "fade-custom col slider-item";
    wrapperNode.innerHTML = template;

    $TEAM_SLIDER.appendChild(wrapperNode);
  });
}

function bindingEventScrollBehavior() {
  window.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop + 500 > OFFSET_USER_SECTION) {
      document.querySelectorAll(".animate-ltr").forEach((item) => {
        item.classList.add("animate-left-to-right");
        item.classList.remove("animate-ltr");
      });
      document.querySelectorAll(".animate-rtl").forEach((item) => {
        item.classList.add("animate-right-to-left");
        item.classList.remove("animate-rtl");
      });
    }
    if (document.documentElement.scrollTop + 5500 > OFFSET_USER_SECTION) {
      document.querySelectorAll(".qLoader2-scroll").forEach((item) => {
        item.classList.add("qLoader2");
        item.classList.remove("qLoader2-scroll");
      });
    }
  });
}

function clearActiveOnSliderHeaderChild() {
  $TEAM_HEADER_SLIDE_CHILD().forEach((item) => {
    item.classList.remove(ACTIVE_SLIDE_CHILD);
  });
}

function autoTransfromSlide() {
    const currentKey = document.getElementsByClassName(ACTIVE_SLIDE_CHILD)[0]
      .id;
    POSITION_KEYS.forEach((item, index) => {
      if (item === currentKey) {
        let nextKey = index + 1;
        if (nextKey > POSITION_KEYS.length - 1) nextKey = 0;
        document.getElementById(POSITION_KEYS[nextKey]).click();
      }
    });
    setTimeout(autoTransfromSlide, TIMEOUT_SLIDE_AUTO_TRANSFORM);
}

function main() {
  renderTeamPositions();
  bindingEventScrollBehavior();
  // autoTransfromSlide();
}

main();
