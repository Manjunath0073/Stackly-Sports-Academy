const MembershipData = (function () {
  'use strict';

  const membership = {
    plan: 'Premium Athlete',
    status: 'active',
    memberSince: 'January 2024',
    expiryDate: 'December 2026',
    autoRenew: true,
    paymentMethod: 'Visa ending in 4242',
    features: [
      { name: 'Unlimited Training Sessions', included: true },
      { name: 'Personal Coach Access', included: true },
      { name: 'Nutrition Consultation', included: true },
      { name: 'Facility Access — All Areas', included: true },
      { name: 'Competition Registration', included: true },
      { name: 'Equipment Rental', included: true },
      { name: 'Recovery & Physiotherapy', included: false },
      { name: 'Exclusive Workshops', included: false }
    ],
    billingHistory: [
      { date: '01 Jun 2026', amount: 299.00, status: 'paid' },
      { date: '01 May 2026', amount: 299.00, status: 'paid' },
      { date: '01 Apr 2026', amount: 299.00, status: 'paid' },
      { date: '01 Mar 2026', amount: 249.00, status: 'paid' }
    ]
  };

  function get() { return membership; }

  return { get };
})();
