const oldToNew = {
  'ios-setup': '/get-started/install/macos/mobile-ios',
  'set-up-the-ios-simulator': '/get-started/install/macos/mobile-ios#configure-your-target-ios-device',
  'deploy-to-physical-ios-devices': '/deployment/ios',
  'deploy-to-ios-devices': '/deployment/ios',

  'macos-setup': '/get-started/install/macos/desktop',

  'android-setup': '/get-started/install/macos/mobile-android#configure-android-development',
  'set-up-your-android-device': '/get-started/install/macos/mobile-android#configure-your-target-android-device',
  'set-up-the-android-emulator': '/get-started/install/macos/mobile-android#configure-your-target-android-device',
  'agree-to-android-licenses': '/get-started/install/macos/mobile-android#agree-to-android-licenses',

  'update-your-path': '/get-started/install/macos/mobile-ios?tab=download#add-flutter-to-your-path',
};

function handleRedirect() {
  const rawOldFragment = window.location.hash;

  // If no fragment was specified, don't do anything.
  if (!rawOldFragment) {
    return;
  }

  const oldFragmentWithHash = rawOldFragment.trim().toLowerCase();

  // If the fragment is empty, don't do anything.
  if (oldFragmentWithHash.length === 0) {
    return;
  }

  const oldFragment = oldFragmentWithHash.substring(1);

  // If the fragment did not exist, don't do anything.
  if (!(oldFragment in oldToNew)) {
    return;
  }

  const newDestination = oldToNew[oldFragment];

  // If the desired destination exists, go there.
  // Otherwise, don't go anywhere.
  fetch(newDestination)
      .then((response) => {
        if (response.status === 200) {
          window.location.replace(newDestination);
        }
      }).catch((_) => {
  });
}

const currentLocation = window.location.pathname;

if (currentLocation.includes('/get-started/install/macos') &&
    currentLocation.split('/')
        .filter(value => value.trim().length !== 0).length === 3) {
  handleRedirect();
}
