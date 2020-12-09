let _handleError = ({ error, errorTip }) => {
    console.error(error);
    if (errorTip) {
        alert(errorTip);
    }
};

let _handleSuccess = ({ successTip }) => {
    if (successTip) alert(successTip);
};

let _storage = null;

/**
 * storage 需要有两个函数 setItem multiGet
 * @param storage
 * @param handleError
 * @param handleSuccess
 */
export default function init({ storage, handleError, handleSuccess }) {
    if (handleError) _handleError = handleError;
    if (storage) _storage = storage;
    if (handleSuccess) _handleSuccess = handleSuccess;
}

export function getHandleSuccess() {
    return _handleSuccess;
}

export function getHandleError() {
    return _handleError;
}

export function getStorage() {
    return _storage;
}
