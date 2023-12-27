import React, { useState } from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

const SearchRecent = (props) => {

    const {textSearch, deleteSaveSearch, searchAgain} = props;
    const [isHidden, setIsHidden] = useState(false);
    const [modalVisiable, setModalVisiable] = useState(false);

    const displayModal = () => {
        setModalVisiable(true);
    }

    const hiddenModal = () => {
        setModalVisiable(false);
    }

    return (
        <View>
            {isHidden ? null :
                <View style={styles.container}>
                 <TouchableOpacity style = {styles.recent} onPress={() => {searchAgain(); deleteSaveSearch();}}>
                    <FontAwesomeIcon size={20} icon={faClock} />
                    <Text style={styles.textRecent}>{textSearch}</Text>
                 </TouchableOpacity>   
                 <TouchableOpacity onPress={() => {displayModal()}}>
                    <FontAwesomeIcon size={20} style={styles.iconEnd} icon={faEllipsis} />
                 </TouchableOpacity>
                </View>
            }

            <Modal
            isVisible={modalVisiable}
            onBackdropPress={() => setModalVisiable(false)}
            style={styles.optionModal}
            backdropColor={'#919492'}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            >
            <View style={{
                height: 'auto',
                width: '100%',
                backgroundColor: 'white',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                padding: 20,
            }}>
                
                <TouchableOpacity style={[styles.optionAction, styles.info]} onPress={() => {}}>
                <FontAwesomeIcon size={20} icon={faClock} />
                {/* <Image style={{height: '100%', aspectRatio: 1, borderRadius: 100,}} source={{uri: avatarImage}}/> */}
                <Text style={{fontSize: 18}}>{textSearch}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.optionAction} onPress={() => { console.log('deltete'); setIsHidden(true); deleteSaveSearch();hiddenModal();}}>
                <Text style={{
                    fontSize: 20,
                }}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionAction} onPress={() => {hiddenModal();}}>
                <Text style={{
                    fontSize: 20,
                }}>Pin this search</Text>
                </TouchableOpacity>
            </View>
            </Modal>
        </View>

    )
}

SearchRecent.propTypes = {
    text: PropTypes.string,
    deleteSaveSearch: PropTypes.func,
    searchAgain: PropTypes.func,
};

export default SearchRecent;

const styles = StyleSheet.create({
    recent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingLeft: 10,
    },

    textRecent: {
        fontSize: 16,
        paddingLeft: 15,
    },
    container: {
        flexDirection: 'row',
        paddingVertical: 15,
        justifyContent: 'space-between',
    },
    iconEnd: {
        marginEnd: 10,
    },
    optionModal: {
        justifyContent: 'flex-end',
        margin: 0,
        borderRadius: 0,
      },

    info: {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        gap: 10,
        paddingBottom: 15,
        borderBottomWidth: 1,

    },
    
    optionAction: {
        paddingTop: 15,
    },
})