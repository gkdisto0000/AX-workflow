    // 이미지 클릭 시 전체화면 팝업
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.img img').forEach(function(img) {
          img.addEventListener('click', function(e) {
            // 팝업 오버레이 생성
            const overlay = document.createElement('div');
            overlay.className = 'img-popup-overlay';
            overlay.tabIndex = 0;
            // 닫기 버튼
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-btn';
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', '이미지 닫기');
            overlay.appendChild(closeBtn);
            // 이미지
            const popupImg = document.createElement('img');
            popupImg.src = img.src;
            popupImg.alt = img.alt || '';
            overlay.appendChild(popupImg);
            document.body.appendChild(overlay);
            // 닫기 함수
            function closePopup() {
              overlay.remove();
              document.removeEventListener('keydown', escHandler);
            }
            // ESC로 닫기
            function escHandler(e) {
              if (e.key === 'Escape') closePopup();
            }
            // 바깥 클릭 시 닫기
            overlay.addEventListener('click', function(e) {
              if (e.target === overlay) closePopup();
            });
            closeBtn.addEventListener('click', closePopup);
            document.addEventListener('keydown', escHandler);
            // 포커스 이동
            closeBtn.focus();
          });
          // 안내 문구 오버레이
          const parent = img.closest('.img');
          let guide;
          function showGuide() {
            if (!guide) {
              guide = document.createElement('div');
              guide.className = 'img-hover-guide';
              guide.innerText = '이미지를 클릭하면 자세히 보실 수 있습니다.';
              parent.appendChild(guide);
            }
            parent.classList.add('show-guide');
          }
          function hideGuide() {
            parent.classList.remove('show-guide');
            if (guide) guide.remove();
            guide = null;
          }
          img.addEventListener('mouseenter', showGuide);
          img.addEventListener('mouseleave', hideGuide);
          // 모바일 터치 대응: 짧게 터치하면 안내, 길게/클릭하면 팝업
          let touchTimer;
          img.addEventListener('touchstart', function(e) {
            touchTimer = setTimeout(showGuide, 200);
          });
          img.addEventListener('touchend', function(e) {
            clearTimeout(touchTimer);
            setTimeout(hideGuide, 400); // 잠깐 보여주고 사라짐
          });
        });
      });