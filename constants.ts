import { Committee, RegionalCommittee, Event, EventCategory, EventTimeline } from './types';

export const leadershipData: (Committee | RegionalCommittee)[] = [
  {
    name: 'Executive Committee',
    members: [
      { name: 'Okello Dickson', title: 'Chairman', school: 'Makerere College School', region: 'Central Region', email: 'okellodsn@gmail.com', phone: '+256 783 562 222', photo: '/img/leadership/okello-dickson.jpg' },
      { name: 'Molo Robson', title: 'Vice Chairman', school: 'Inomo S.S', region: 'Northern Region', email: 'robsonmolo@gmail.com', phone: '+256 773 346 360', photo: '/img/leadership/molo-robson.jpg' },
      { name: 'Seguya Wilfred Bakaluba', title: 'General Secretary', school: 'Hana International', region: 'Central Region', email: 'wilfredsseguya@gmail.com', phone: '+256 788 378 660', photo: '/img/leadership/seguya-wilfred.jpg' },
      { name: 'Sewaya Ismail', title: 'Treasurer', school: 'Kira College Butiki', region: 'Eastern Region', email: 'sewayamiti77@gmail.com', phone: '+256 774 416 871', photo: '/img/leadership/sewaya-ismail.jpg' },
      { name: 'Faridah Kayegi', title: 'Woman Representative', school: 'Oxford High School Mbale', region: 'Eastern Region', email: 'kayeridah1@gmail.com', phone: '+256 786 082 927', photo: '/img/leadership/faridah-kayegi.jpg' },
      { name: 'Wati Richard', title: 'Central Schools Representative', school: 'London College of St. Lawrence-Maya', region: 'Central Region', email: 'watirichard3@gmail.com', phone: '+256 766 026 974', photo: '/img/leadership/wati-richard.jpg' },
      { name: 'Kigenyi Patrick Paul', title: 'Western Schools Representative', school: 'Mbarara High School', region: 'Western Region', email: 'mukyapat@gmail.com', phone: '+256 775 728 516', photo: '/img/leadership/kigenyi-patrick.jpg' },
      { name: 'Ochakachon Robert', title: 'Northern Schools Representative', school: 'Sir Samuel Baker School-Gulu', region: 'Northern Region', email: 'ochakachonrobert@gmail.com', phone: '+256 779 758 887', photo: '/img/leadership/ochakachon-robert.jpg' },
      { name: 'Barasa Moses', title: 'Eastern Schools Representative', school: 'Busoga College Mwiri', region: 'Eastern Region', email: 'barasamoses295@gmail.com', phone: '+256 772 614 568', photo: '/img/leadership/barasa-moses.jpg' },
    ],
  },
  {
    name: 'Finance Committee',
    members: [
        { name: 'Sewaya Ismail', title: 'Chairperson', school: 'Kira College Butiki', region: 'Eastern Region', email: 'sewayamiti77@gmail.com', phone: '+256 774 416 871' },
        { name: 'Seguya Wilfred Bakaluba', title: 'Secretary', school: 'Hana International', region: 'Central Region', email: 'wilfredsseguya@gmail.com', phone: '+256 788 378 660' },
        { name: 'Okello Dickson', title: 'Member', school: 'Makerere College School', region: 'Central Region', email: 'okellodsn@gmail.com', phone: '+256 783 562 222' },
        { name: 'Kigenyi Patrick Paul', title: 'Member', school: 'Mbarara High School', region: 'Western Region', email: 'mukyapat@gmail.com', phone: '+256 775 728 516' },
        { name: 'Ochakachon Robert', title: 'Member', school: 'Sir Samuel Baker School Gulu', region: 'Northern Region', email: 'ochakachonrobert@gmail.com', phone: '+256 779 758 887' },
    ],
  },
  {
    name: 'Technical Committee',
    members: [
        { name: 'Matsiko Vian', title: 'Chairperson', school: 'TBA', region: 'TBA' },
        { name: 'Molo Robson', title: 'Secretary', school: 'Inomo S.S', region: 'Northern Region', email: 'robsonmolo@gmail.com', phone: '+256 773 346 360' },
        { name: 'Barasa Moses', title: 'Member', school: 'Busoga College Mwiri', region: 'Eastern Region', email: 'barasamoses295@gmail.com', phone: '+256 772 614 568' },
        { name: 'Wati Richard', title: 'Member', school: 'London College of St. Lawrence Maya', region: 'Central Region', email: 'watirichard3@gmail.com', phone: '+256 766 026 974' },
        { name: 'Ochakachon Robert', title: 'Member', school: 'Sir Samuel Baker School Gulu', region: 'Northern Region', email: 'ochakachonrobert@gmail.com', phone: '+256 779 758 887' },
        { name: 'Kigenyi Patrick Paul', title: 'Member', school: 'Mbarara High School', region: 'Western Region', email: 'mukyapat@gmail.com', phone: '+256 775 728 516' },
        { name: 'Seguya Wilfred Bakaluba', title: 'Member', school: 'Hana International', region: 'Central Region', email: 'wilfredsseguya@gmail.com', phone: '+256 788 378 660' },
    ],
  },
  {
    name: 'Disciplinary Committee',
    members: [
        { name: 'Faridah Kayegi', title: 'Secretary', school: 'Oxford High School Mbale', region: 'Eastern Region', email: 'kayeridah1@gmail.com', phone: '+256 786 082 927' },
        { name: 'To Be Appointed', title: 'Additional Members', school: 'Various Schools', region: 'All Regions' },
    ],
  },
  {
    name: 'Regional Committees',
    zones: [
        {
            name: 'Central Region Committee',
            members: [
                { name: 'Wati Richard', title: 'Chairperson', school: 'London College of St. Lawrence Maya', region: 'Central Region', email: 'watirichard3@gmail.com', phone: '+256 766 026 974' },
                { name: 'Adong Zelindae Harriet', title: 'Entebbe Zone', school: 'Boston High School Mpala', region: 'Central Region', email: 'zelindaharriets@gmail.com', phone: '+256 770 726 467' },
                { name: 'Erisa Mwesigwa', title: 'Muko Zone', school: 'Mpunge Seed School', region: 'Central Region', email: 'Erisamwesigwa.em@gmail.com', phone: '+256 701 722 736' },
            ]
        },
        {
            name: 'Western Region Committee',
            members: [
                { name: 'Kigenyi Patrick Paul', title: 'Ankole Zone', school: 'Mbarara High School', region: 'Western Region', email: 'mukyapat@gmail.com', phone: '+256 775 728 516' },
                { name: 'Hannington Rugumayo', title: 'Rwenzori Zone', school: 'Nyakasura School', region: 'Western Region', email: 'hanningtonjames31@gmail.com', phone: '+256 785 291 931' },
                { name: 'Kafeero Yusufu', title: 'Masaka Zone', school: 'Kijjabwemi S.S', region: 'Western Region', email: 'yusufukafeero3@gmail.com', phone: '+256 755 369 747' },
                { name: 'Atuheirirwe Charlotte', title: 'Kigezi Zone', school: 'Kigezi High School', region: 'Western Region', email: 'acharlotte2013@gmail.com', phone: '+256 785 957 535' },
            ]
        },
        {
            name: 'Northern Region Committee',
            members: [
                { name: 'Ochakachon Robert', title: 'West Acholi', school: 'Sir Samuel Baker School', region: 'Northern Region', email: 'ochakachonrobert@gmail.com', phone: '+256 779 758 887' },
                { name: 'Olanya Thomas', title: 'East Acholi', school: 'Kitgum Comprehensive College', region: 'Northern Region', email: 'olanyathomas5@gmail.com', phone: '+256 762 180 188' },
                { name: 'Okot Jaspher', title: 'Lango Zone', school: 'Dr. Obote College Boroboro', region: 'Northern Region', email: 'okotjaspher123@gmail.com', phone: '+256 782 876 832' },
                { name: 'Bayo Hamid', title: 'West Nile Zone', school: 'St. Augustine S.S', region: 'Northern Region', email: 'bayohamid80@gmail.com', phone: '+256 778 938 578' },
            ]
        },
        {
            name: 'Eastern Region Committee',
            members: [
                { name: 'Barasa Moses', title: 'Busoga Zone', school: 'Busoga College Mwiri', region: 'Eastern Region', email: 'barasamoses295@gmail.com', phone: '+256 772 614 568' },
                { name: 'Ochola Samuel', title: 'Bukedi Zone', school: 'Great Aubrey Memorial', region: 'Eastern Region', phone: '+256 706 066 806' },
                { name: 'Ethel Musabi', title: 'Malwa Bugisu Zone', school: 'Nabumali High School', region: 'Eastern Region', email: 'emnamusabi@gmail.com', phone: '+256 702 904 183' },
                { name: 'Mutyaba Vincent', title: 'Teso Zone', school: 'St. Michael S.S-Amen', region: 'Eastern Region', phone: '+256 700 487 831' },
            ]
        }
    ]
  },
  {
    name: "Girls' Rugby Committee",
    members: [
        { name: 'Ms. Kayegi Faridah', title: 'Chairperson', school: 'Oxford High School Mbale', region: 'Eastern Region', email: 'kayeridah1@gmail.com', phone: '+256 786 082 927' },
        { name: 'Mr. Molo Robson', title: 'Secretary', school: 'Inomo S.S', region: 'Northern Region', email: 'robsonmolo@gmail.com', phone: '+256 773 346 360' },
        { name: 'Mr. Kafeero Yusuf', title: 'Western Region Member', school: 'Kijjabwemi S.S', region: 'Western Region', email: 'yusufukafeero3@gmail.com', phone: '+256 755 369 747' },
        { name: 'Ms. Zerinda Adong Harriet', title: 'Central Region Member', school: 'Boston High School Mpala', region: 'Central Region', email: 'zelindaharriets@gmail.com', phone: '+256 770 726 467' },
        { name: 'Ms. Ethel Malwa', title: 'Eastern Region Member', school: 'Nabumali High School', region: 'Eastern Region', email: 'emnamusabi@gmail.com', phone: '+256 702 904 183' },
    ],
  },
];

export const eventsData: Event[] = [
    { id: 10, title: 'Annual General Meeting', date: 'September 6, 2025', targetDate: '2025-09-06', location: 'USRA Headquarters, Kampala', description: 'Annual general meeting to review the year\'s achievements and plan for the future.', category: EventCategory.MEETING, timeline: EventTimeline.CURRENT, badge: 'Happening Today', image: '/img/events/agm.jpg', responsible: 'EXCOM' },
    { id: 11, title: 'Independence Cup', date: 'October 9, 2025', targetDate: '2025-10-09', location: 'Kampala - Venue TBA', description: 'Special tournament celebrating Uganda\'s independence with participation from all regions.', category: EventCategory.SPECIAL, timeline: EventTimeline.UPCOMING, badge: 'Next Event', image: '/img/events/independence-cup.jpg', responsible: 'All Regional Representatives' },
    { id: 12, title: 'Abu Dhabi World Schools Festival', date: 'December 14-20, 2025', targetDate: '2025-12-14', location: 'Abu Dhabi, UAE', description: 'Elite international schools rugby festival featuring Uganda\'s U20 select team.', category: EventCategory.INTERNATIONAL, timeline: EventTimeline.UPCOMING, badge: 'International', image: '/img/events/abu-dhabi-festival.jpg', responsible: 'National Schools U20 Select, URU, EXCOM' },
    { id: 1, title: 'EXCOM Annual Planning Meeting', date: 'January 15, 2025', location: 'USRA Headquarters, Kampala', description: 'Annual executive committee meeting to plan the year\'s activities and set strategic direction.', category: EventCategory.MEETING, timeline: EventTimeline.PAST, badge: 'Completed', image: '/img/events/excom-planning.jpg', responsible: 'EXCOM' },
    { id: 2, title: 'Ball Game One Qualifiers', date: 'Feb 23 - Apr 6, 2025', location: 'All Regions - Multiple Venues', description: 'Regional qualifying tournaments across Central, Eastern, Western, and Northern regions.', category: EventCategory.TOURNAMENT, timeline: EventTimeline.PAST, badge: 'Completed', image: '/img/events/ball-game-one.jpg', responsible: 'Regional Coordination Committees & RDOs', leagues: ['Central Main League', 'Regional Girls\' Leagues', '+7 more leagues'] },
    { id: 3, title: 'Regional Qualifiers Evaluation', date: 'April 6-13, 2025', location: 'Regional Centers', description: 'Post-qualifier evaluation meetings to assess performance and prepare for national games.', category: EventCategory.MEETING, timeline: EventTimeline.PAST, badge: 'Completed', image: '/img/events/regional-evaluation.jpg', responsible: 'Regional Representatives' },
    { id: 4, title: 'Ball Game One Evaluation Meeting', date: 'April 19, 2025', location: 'USRA Headquarters, Kampala', description: 'Comprehensive evaluation of qualifiers and strategic planning for national ball game one.', category: EventCategory.MEETING, timeline: EventTimeline.PAST, badge: 'Completed', image: '/img/events/planning-meeting.jpg', responsible: 'EXCOM' },
    { id: 5, title: 'USSSA National Ball Game One', date: 'May 4-14, 2025', location: 'Kampala Rugby Club', description: 'The premier national schools rugby championship featuring qualified teams from across Uganda.', category: EventCategory.NATIONAL, timeline: EventTimeline.PAST, badge: 'Completed', image: '/img/events/usssa-nationals-1.jpg', responsible: 'Qualified Schools' },
    { id: 6, title: 'Ball Game Two Qualifiers (7s)', date: 'June 8-29, 2025', location: 'Regional Venues', description: 'Fast-paced 7s rugby qualifiers including Kabaka Coronation, Kyabazinga, and regional championships.', category: EventCategory.TOURNAMENT, timeline: EventTimeline.PAST, badge: 'Completed', image: '/img/events/sevens-qualifiers.jpg', responsible: 'Regional Coordination Committees & RDOs', leagues: ['Kabaka Coronation 7s', 'Kyabazinga 7s', '+3 more tournaments'] },
    { id: 7, title: 'Ball Game Two & AGM Planning', date: 'July 5, 2025', location: 'USRA Headquarters, Kampala', description: 'Evaluation of 7s tournaments and strategic planning for Ball Game Two and AGM preparations.', category: EventCategory.MEETING, timeline: EventTimeline.PAST, badge: 'Completed', image: '/img/events/agm-planning.jpg', responsible: 'EXCOM' },
    { id: 8, title: 'USSSA National Ball Game Two', date: 'July 9-18, 2025', location: 'Kampala Rugby Club', description: 'Second national schools rugby championship featuring qualified teams from 7s tournaments.', category: EventCategory.NATIONAL, timeline: EventTimeline.PAST, badge: 'Completed', image: '/img/events/usssa-nationals-2.jpg', responsible: 'Qualified Schools' },
    { id: 9, title: 'FEASSA Games', date: 'August 19-27, 2025', location: 'Nairobi, Kenya', description: 'Federation of East African Secondary Schools Sports Association games featuring Uganda\'s best.', category: EventCategory.INTERNATIONAL, timeline: EventTimeline.PAST, badge: 'Completed', image: '/img/events/feassa-games.jpg', responsible: 'Qualified Schools' }
];