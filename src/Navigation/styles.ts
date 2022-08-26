import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FONTS, COLORS, FONTFAMILY } from '../Utils/theme';

export default StyleSheet.create({
	selectedMain: {
		backgroundColor: '#FFF',
		height: hp(4.5),
		width: wp(24),
		justifyContent: 'center'
	},
	unSelectedText: {
		alignSelf: 'center',
		color: '#001420',
		fontSize: hp(1.6),
		fontFamily: FONTFAMILY.WorkSans_Regular
	},
	selectedText: {
		alignSelf: 'center',
		color: '#0084D4',
		fontSize: hp(1.6),
		fontFamily: FONTFAMILY.WorkSans_Regular
	},
	barStyle: {
		backgroundColor: '#FFF',
		width: wp(100),
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		height: hp(9),
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		maxHeight: 90
	},
	image: {
		alignSelf: 'center'
	},
	splash:{
		flex:1
	}
});
