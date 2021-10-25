import DialogWrapper from "../../common/Dialog/DialogWrapper";
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux"
import React, { useState, useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from "@material-ui/core";
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './styles';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from "@material-ui/core/Checkbox";

import { AddRiskControls, RemoveRiskControls } from '../../../actions/risks';
import { useHistory } from 'react-router';


const RiskControls = ({ mainRouteName, showDialog, setShowDialog, riskId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { controls, controlsByRisk } = useSelector(state => state.controls);
    const riskName = useSelector(state => state.risks.risks.find(r => r.id === riskId))?.code;
    const [tableData, setTableData] = useState([]);
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [optionsSelect, setOptionsSelect] = useState([]);
    const history = useHistory();


    const closeDialog = () => {
        setShowDialog(false);

    }

    useEffect(() => {
        setOptionsSelect(controls.filter(control =>
            !controlsByRisk.map(control => control.id).includes(control.id)
        ));
        setTableData(controlsByRisk.map(control => (
            {
                id: control.id,
                selected: true,
                code: control.code
            })));
    }, [controlsByRisk]);

    const handleChangeCheckbox = (event, controlId) => {
        const index = tableData.findIndex(control => control.id === controlId);
        const newArray = [...tableData];
        newArray[index].selected = event.target.checked;
        setTableData(newArray);
    };

    const addControl = () => {
        if (selectedOption) {
            setTableData([...tableData,
            {
                id: selectedOption.id,
                selected: true,
                code: selectedOption.code
            }]);

            setSelectedOption(null);
            setOptionsSelect(optionsSelect.filter(control => control.id !== selectedOption.id
                && !controlsByRisk.map(control => control.id).includes(control.id)
            ));
        }
    };

    const saveRiskControls = async () => {
        const addedControls = tableData.filter(control => control.selected === true && !controlsByRisk.map(control => control.id).includes(control.id));

        const removedControls = tableData.filter(control => control.selected === false && controlsByRisk.map(control => control.id).includes(control.id));

        if (addedControls.length > 0) {
            const formattedData = {
                riskControls: addedControls.map(control =>
                ({
                    riskId: riskId,
                    controlId: control.id

                }))
            }
            await dispatch(AddRiskControls(formattedData));
        }

        if (removedControls.length > 0) {
            const formattedData = {
                riskControls: removedControls.map(control =>
                ({
                    riskId: riskId,
                    controlId: control.id

                }))
            }
            await dispatch(RemoveRiskControls(formattedData));
        }
        history.push(`${mainRouteName}`);
        closeDialog();

    };

    return (
        <DialogWrapper fullWidth="md" open={showDialog} title={"Controles del riesgo " + riskName} close={closeDialog}>

            <Grid className={classes.searchBarContainer} container mb={2} spacing={2} alignItems="left" justify="flex-end">
                <Grid item xs={12} sm={6} md={4}>
                    <Autocomplete
                        disablePortal
                        options={optionsSelect}
                        value={selectedOption}
                        onChange={(event, newValue) => {
                            setSelectedOption(newValue);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                addControl();
                            }
                        }}

                        getOptionLabel={(option) => option.code}
                        sx={{ width: 50 }}
                        renderInput={(params) => <TextField {...params} variant="outlined" label="Buscar controles..." />} />
                </Grid>

            </Grid>



            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400, maxWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Control</TableCell>
                            <TableCell align="center" >Asignado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{row.code}</TableCell>
                                <TableCell align="center">
                                    <Checkbox
                                        checked={row.selected}
                                        style={{
                                            color: "#023E7D",
                                        }}
                                        onChange={(e) => handleChangeCheckbox(e, row.id)} />
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Grid className={classes.footer} container mt={12} alignItems="left" justify="flex-end">
                <Button variant="contained" color="secondary" onClick={closeDialog}
                    className={classes.button}>Cancelar</Button>

                <Button variant="contained" color="primary" type="submit"
                    className={classes.button} onClick={saveRiskControls}> Asignar </Button>
            </Grid>



        </DialogWrapper>
    );
}

export default RiskControls;