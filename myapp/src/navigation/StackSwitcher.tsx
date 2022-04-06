import React from 'react';
import { useSelector } from 'react-redux';
import { OnboardingStack } from './OnboardingStack';
import { BottomTabs } from './TabsStack';

export function StackSwitcher() {

  const user = useSelector((state: any) => state?.user);

  return user?.userProfile
    ?
    <BottomTabs navigation={navigator} />
    :
    <OnboardingStack />;
}
