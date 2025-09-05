# Jiho! - Korean Food Brand Websitee

Website chính thức của thương hiệu Jiho - một thương hiệu thực phẩm Hàn Quốc với thiết kế hiện đại và trải nghiệm người dùng tuyệt vời.
 
## 🌟 Giới thiệu

Jiho! là một website giới thiệu thương hiệu thực phẩm Hàn Quốc với:

- Thiết kế responsive, tối ưu cho mọi thiết bị
- Animation mượt mà với thư viện Motion
- Giao diện hiện đại với font chữ đặc biệt
- Trải nghiệm người dùng được tối ưu hóa

## 🚀 Tính năng chính

- **Responsive Design**: Tương thích với mọi thiết bị từ mobile đến desktop
- **Smooth Animations**: Sử dụng thư viện Motion để tạo hiệu ứng mượt mà
- **Mobile Menu**: Menu điều hướng thân thiện với mobile
- **Product Carousel**: Hiển thị sản phẩm với Swiper.js
- **Scroll Animations**: Hiệu ứng khi cuộn trang
- **Header Shadow**: Hiệu ứng đổ bóng header khi cuộn

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc semantic
- **CSS3**: Styling với custom properties và modern CSS
- **JavaScript (ES6+)**: Tương tác và animation
- **jQuery**: DOM manipulation
- **Swiper.js**: Carousel/slider cho sản phẩm
- **Motion**: Animation library cho hiệu ứng mượt mà
- **Prettier**: Code formatting

## 📁 Cấu trúc dự án

```
korean-f/
├── assets/
│   ├── atomic.css          # Atomic CSS utilities
│   ├── styles.css          # Main stylesheet
│   ├── font/               # Custom fonts (Bestime)
│   ├── icon/               # SVG icons
│   └── images/             # Images organized by sections
│       ├── about-us/
│       ├── elements/
│       ├── hero-section/
│       ├── our-brand/
│       └── products/
├── index.html              # Main HTML file
├── main.js                 # JavaScript functionality
├── package.json            # Dependencies and scripts
└── README.md              # Project documentation
```

## 🎨 Thiết kế

- **Font chính**: Noto Sans KR, Poppins
- **Font đặc biệt**: Bestime (custom font)
- **Color scheme**: Tối ưu cho thương hiệu thực phẩm
- **Layout**: Grid và Flexbox cho responsive design

## 🚀 Cài đặt và chạy

1. **Clone repository**:

   ```bash
   git clone <repository-url>
   cd korean-f
   ```

2. **Cài đặt dependencies**:

   ```bash
   npm install
   ```

3. **Chạy dự án**:
   - Mở file `index.html` trực tiếp trong browser
   - Hoặc sử dụng live server (VS Code extension)

4. **Format code** (tùy chọn):
   ```bash
   npm run format
   ```

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Small Mobile**: 480px - 640px
- **Tablet**: 640px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

## 🎯 Tính năng JavaScript

### Mobile Menu

- Toggle menu với animation
- Đóng menu khi click outside hoặc nhấn Escape
- Tự động đóng khi resize về desktop

### Scroll Effects

- Header shadow khi cuộn
- Smooth scroll đến sections
- Animation elements khi hover

### Product Carousel

- Swiper.js với responsive breakpoints
- Loop infinite
- Touch/swipe support

## 🎨 Animation Features

- **Hover Effects**: Scale và rotate animations
- **Scroll Animations**: Elements animate khi scroll
- **Smooth Transitions**: CSS transitions cho UI elements
- **Spring Animations**: Sử dụng Motion library

## 📦 Dependencies

```json
{
  "devDependencies": {
    "prettier": "^3.6.2"
  }
}
```

## 🌐 CDN Dependencies

- Swiper.js (CSS & JS)
- Motion library
- Google Fonts (Noto Sans KR, Poppins)

## 🔧 Scripts

- `npm run format`: Format code với Prettier
- `npm run format:check`: Kiểm tra format code

**Jiho!** - Chào mừng đến với thế giới của Jiho! 🍜✨
