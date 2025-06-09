// Image Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    function initImageModal() {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');
        const captionText = document.getElementById('caption');
        const closeModal = document.getElementsByClassName('modal-close')[0];
        const clickableImages = document.querySelectorAll('.clickable-image img, .project-image img');

        if (modal && modalImg && captionText) {
            clickableImages.forEach(img => {
                img.addEventListener('click', function() {
                    modal.style.display = 'block';
                    modalImg.src = this.src;
                    captionText.innerHTML = this.alt;
                });
            });

            // Close modal when clicking X
            if (closeModal) {
                closeModal.addEventListener('click', function() {
                    modal.style.display = 'none';
                });
            }

            // Close modal when clicking outside image
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            });
        }
    }

    // Initialize the modal
    initImageModal();
}); 