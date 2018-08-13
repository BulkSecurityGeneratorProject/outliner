package outliner.web.rest;

import com.codahale.metrics.annotation.Timed;
import outliner.domain.L3Table;
import outliner.repository.L3TableRepository;
import outliner.repository.search.L3TableSearchRepository;
import outliner.web.rest.errors.BadRequestAlertException;
import outliner.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing L3Table.
 */
@RestController
@RequestMapping("/api")
public class L3TableResource {



    private final Logger log = LoggerFactory.getLogger(L3TableResource.class);

    private static final String ENTITY_NAME = "l3Table";

    private final L3TableRepository l3TableRepository;

    private final L3TableSearchRepository l3TableSearchRepository;

    public L3TableResource(L3TableRepository l3TableRepository, L3TableSearchRepository l3TableSearchRepository) {
        this.l3TableRepository = l3TableRepository;
        this.l3TableSearchRepository = l3TableSearchRepository;
    }

    /**
     * POST  /l-3-tables : Create a new l3Table.
     *
     * @param l3Table the l3Table to create
     * @return the ResponseEntity with status 201 (Created) and with body the new l3Table, or with status 400 (Bad Request) if the l3Table has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/l-3-tables")
    @Timed
    public ResponseEntity<L3Table> createL3Table(@RequestBody L3Table l3Table) throws URISyntaxException {
        log.debug("REST request to save L3Table : {}", l3Table);
        if (l3Table.getId() != null) {
            throw new BadRequestAlertException("A new l3Table cannot already have an ID", ENTITY_NAME, "idexists");
        }
        L3Table result = l3TableRepository.saveFlushAndRefresh(l3Table);
        //EntityManager flush should be called here
        l3TableSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/l-3-tables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /l-3-tables : Updates an existing l3Table.
     *
     * @param l3Table the l3Table to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated l3Table,
     * or with status 400 (Bad Request) if the l3Table is not valid,
     * or with status 500 (Internal Server Error) if the l3Table couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/l-3-tables")
    @Timed
    public ResponseEntity<L3Table> updateL3Table(@RequestBody L3Table l3Table) throws URISyntaxException {
        log.debug("REST request to update L3Table : {}", l3Table);
        if (l3Table.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        L3Table result = l3TableRepository.saveFlushAndRefresh(l3Table);
        //EntityManager flush should be called here
        l3TableSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, l3Table.getId().toString()))
            .body(result);
    }

    /**
     * GET  /l-3-tables : get all the l3Tables.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of l3Tables in body
     */
    @GetMapping("/l-3-tables")
    @Timed
    public List<L3Table> getAllL3Tables() {
        log.debug("REST request to get all L3Tables");
        return (List<L3Table>) l3TableRepository.findAll();
    }

    /**
     * GET  /l-3-tables/:id : get the "id" l3Table.
     *
     * @param id the id of the l3Table to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the l3Table, or with status 404 (Not Found)
     */
    @GetMapping("/l-3-tables/{id}")
    @Timed
    public ResponseEntity<L3Table> getL3Table(@PathVariable Long id) {
        log.debug("REST request to get L3Table : {}", id);
        Optional<L3Table> l3Table = l3TableRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(l3Table);
    }

    /**
     * DELETE  /l-3-tables/:id : delete the "id" l3Table.
     *
     * @param id the id of the l3Table to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/l-3-tables/{id}")
    @Timed
    public ResponseEntity<Void> deleteL3Table(@PathVariable Long id) {
        log.debug("REST request to delete L3Table : {}", id);

        l3TableRepository.deleteById(id);
        l3TableSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/l-3-tables?query=:query : search for the l3Table corresponding
     * to the query.
     *
     * @param query the query of the l3Table search
     * @return the result of the search
     */
    @GetMapping("/_search/l-3-tables")
    @Timed
    public List<L3Table> searchL3Tables(@RequestParam String query) {
        log.debug("REST request to search L3Tables for query {}", query);
        return StreamSupport
            .stream(l3TableSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
