import Swal from 'sweetalert2';

// 에러 알림
export const showErrorAlert = (message?: string, title?: string) => {
  return Swal.fire({
    icon: 'error',
    title: title || '[DEFAULT] 오류가 발생했습니다',
    text: message || '[DEFAULT] 요청을 처리하는 중 문제가 발생했습니다.',
    confirmButtonText: '확인',
    confirmButtonColor: '#d33',
    background: '#fff',
    color: '#333',
    backdrop: true,
    allowOutsideClick: true,
    customClass: {
      popup: 'custom-error-popup',
      title: 'custom-error-title',
      htmlContainer: 'custom-error-text'
    }
  });
};

// 성공 알림 (추후 사용 가능)
export const showSuccessAlert = (message?: string, title?: string) => {
  return Swal.fire({
    icon: 'success',
    title: title || '[DEFAULT] 성공',
    text: message || '[DEFAULT] 작업이 성공적으로 완료되었습니다.',
    confirmButtonText: '확인',
    confirmButtonColor: '#28a745',
    background: '#fff',
    color: '#333',
    timer: 2000,
    timerProgressBar: true
  });
};

// 확인 알림 (추후 사용 가능)
export const showConfirmAlert = (message?: string, title?: string) => {
  return Swal.fire({
    icon: 'warning',
    title: title || '[DEFAULT] 확인',
    text: message || '[DEFAULT] 정말로 진행하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    confirmButtonColor: '#007bff',
    cancelButtonColor: '#6c757d',
    background: '#fff',
    color: '#333'
  });
};