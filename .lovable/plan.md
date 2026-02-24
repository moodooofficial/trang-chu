
# MOODOO - Hành Trình Cảm Xúc Giáo Dục Cùng Trẻ 🦔✨

## Tổng quan
Chuyển đổi toàn bộ 7 trang HTML tĩnh sang ứng dụng React SPA (Single Page Application) với thiết kế được nâng cấp hiện đại hơn, giữ nguyên phong cách vui tươi, đầy màu sắc phù hợp trẻ em. Tất cả các trang được liên kết qua thanh Navigation Bar chung.

## Cấu trúc Navigation Bar
Thanh điều hướng sticky với các mục:
- **Trang chủ** → `/`
- **Giới thiệu** → `/gioi-thieu`
- **Thư viện** → `/thu-vien` (🔒 cần đăng nhập)
- **Cửa tiệm** → `/cua-tiem`
- **Hang động nhỏ** → `/hang-dong-nho` (🔒 cần đăng nhập)
- **Blog** → `/blog` (🔒 cần đăng nhập)
- Nút **Đăng nhập / Đăng ký** + icon giỏ hàng 🛒

## Các trang & tính năng

### 1. Trang chủ (Homepage)
- Header vàng với logo MOODOO + slogan + mascot nhím
- Section giới thiệu câu chuyện Moodoo (nền xanh lá)
- Showcase bộ sách "Vùng Đất Cảm Xúc" I & II
- Grid "Why MOODOO?" với 6 lý do (nền cam)
- Section team với avatar 5 thành viên
- CTA section (nền hồng)
- Footer cam với thông tin liên hệ

### 2. Giới thiệu (About)
- Banner tiêu đề "Về Chúng Mình"
- 3 sections xen kẽ layout trái-phải:
  - Chúng mình là MOODOO (nền trắng)
  - Phương pháp CASEL (nền vàng nhạt)
  - Giá trị mang lại (nền xanh nhạt)

### 3. Thư viện (Library) - 🔒 Cần đăng nhập
- Gate đăng nhập cho người chưa login
- Sau khi đăng nhập hiện:
  - Grid 4 video YouTube nhúng
  - Grid 6 cảm xúc cơ bản (Vui, Buồn, Giận, Sợ, Ngạc nhiên, Yêu thương)
  - 3 nút ebook liên kết ra Heyzine flipbook

### 4. Cửa tiệm (Shop)
- Danh mục sản phẩm: Sách, Combo tiết kiệm, Pack Cards
- Card sản phẩm với ảnh, tên, mô tả, giá, nút "Thêm vào giỏ"
- Giỏ hàng (localStorage) với popup xem giỏ hàng
- Demo flipbook nhúng iframe
- Nút "Gửi đơn hàng" dẫn sang trang thanh toán

### 5. Hang Động Nhỏ (Cave) - 🔒 Cần đăng nhập
- Giao diện tím đậm "hang động bí mật" với hiệu ứng sao trời
- Gate "Gõ cửa hang" cho người chưa đăng nhập
- Sau khi đăng nhập: hiện nội dung + kết nối chatbot AI (Chatbase)
- Mascot nhím với animation bay nhẹ

### 6. Blog / Góc Chia Sẻ - 🔒 Cần đăng nhập
- Gate đăng nhập cho người chưa login
- Bài viết nổi bật (featured post) layout ngang
- Grid 3 bài viết nhỏ với ảnh, ngày, tiêu đề, tóm tắt

### 7. Thanh toán (Checkout)
- Layout 2 cột: form thông tin giao hàng + tóm tắt đơn hàng
- Form: Họ tên, SĐT, Số tài khoản ngân hàng, Địa chỉ, Ghi chú
- Hiển thị danh sách sản phẩm từ giỏ hàng + tổng tiền
- Nút "Xác nhận đặt hàng"

## Tính năng chung
- **Đăng nhập / Đăng ký**: Modal popup với 2 tab, đăng ký cần nhập Mã Sách, kết nối Google Apps Script API hiện có
- **Giỏ hàng**: Lưu localStorage, hiển thị số lượng trên icon, popup xem/xóa
- **Gated Content**: Thư viện, Hang động nhỏ, Blog yêu cầu đăng nhập mới xem được
- **Responsive**: Tương thích mobile

## Nâng cấp Design
- Thêm hiệu ứng hover, transition mượt mà hơn trên các card và button
- Bo góc mềm mại, shadow nhẹ nhàng phong cách "cute & friendly"
- Typography sử dụng font Fredoka (playful) + Nunito Sans (dễ đọc)
- Bảng màu giữ nguyên tinh thần: vàng, cam, xanh lá, hồng, tím
- Animation fade-in khi scroll, hover effects trên product cards
- Navigation bar gọn gàng hơn với responsive hamburger menu trên mobile

## Lưu ý kỹ thuật
- Dữ liệu sản phẩm, bài blog, team sẽ được hardcode trong code (không cần backend database)
- Auth vẫn gọi đến Google Apps Script URL hiện tại
- Giỏ hàng dùng localStorage
- Ảnh placeholder sẽ được sử dụng thay cho ảnh gốc (vì không có file ảnh)
